import {Injectable} from '@angular/core';
import * as Aubio from "./aubio/aubio";
import {Pitch} from "./aubio/aubio";
import {Note} from "./notes/note.model";

@Injectable({
    providedIn: 'root'
})
export class TunerService {

    middleA = 440
    semitone = 69;
    bufferSize = 4096
    noteStrings = [
        'C',
        'C♯',
        'D',
        'D♯',
        'E',
        'F',
        'F♯',
        'G',
        'G♯',
        'A',
        'A♯',
        'B'
    ]

    audioContext: AudioContext;
    analyser: AnalyserNode;
    scriptProcessor: ScriptProcessorNode;
    oscillator: OscillatorNode;
    pitchDetector: Pitch;
    onNoteDetected: (note: Note) => void;
    stream: MediaStream;

    constructor() {
        this.initGetUserMedia()
    }

    initGetUserMedia() {
        window['AudioContext'] = window['AudioContext'] || window['webkitAudioContext']
        if (!window['AudioContext']) {
            return alert('AudioContext not supported')
        }

        // Older browsers might not implement mediaDevices at all, so we set an empty object first
        if (navigator.mediaDevices === undefined) {
            (navigator as any).mediaDevices = {}
        }

        // Some browsers partially implement mediaDevices. We can't just assign an object
        // with getUserMedia as it would overwrite existing properties.
        // Here, we will just add the getUserMedia property if it's missing.
        if (navigator.mediaDevices.getUserMedia === undefined) {
            navigator.mediaDevices.getUserMedia = constraints => {
                // First get ahold of the legacy getUserMedia, if present
                const getUserMedia = navigator['webkitGetUserMedia'] || navigator['mozGetUserMedia']

                // Some browsers just don't implement it - return a rejected promise with an error
                // to keep a consistent interface
                if (!getUserMedia) {
                    alert('getUserMedia is not implemented in this browser')
                }

                // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
                return new Promise((resolve, reject) => {
                    getUserMedia.call(navigator, constraints, resolve, reject)
                })
            }
        }
    }

    startRecord() {
        const tuner = this;
        navigator.mediaDevices
            .getUserMedia({audio: true})
            .then(stream => {
                this.stream = stream
                this.audioContext.createMediaStreamSource(stream).connect(this.analyser)
                this.analyser.connect(this.scriptProcessor)
                this.scriptProcessor.connect(this.audioContext.destination)
                this.scriptProcessor.addEventListener('audioprocess', event => {
                    const frequency = this.pitchDetector.do(event.inputBuffer.getChannelData(0))
                    if (frequency && this.onNoteDetected) {
                        const note = tuner.getNote(frequency)
                        this.onNoteDetected({
                            name: tuner.noteStrings[note % 12],
                            value: note,
                            cents: tuner.getCents(frequency, note),
                            octave: Math.floor(note / 12) - 1,
                            frequency: frequency
                        })
                    }
                })
            })
            .catch(error => {
                alert(error.name + ': ' + error.message)
            })
    }

    init() {
        this.audioContext = new window['AudioContext']()
        this.analyser = this.audioContext.createAnalyser()
        this.scriptProcessor = this.audioContext.createScriptProcessor(
            this.bufferSize,
            1,
            1
        )

        Aubio().then(aubio => {
            this.pitchDetector = new aubio.Pitch(
                'default',
                this.bufferSize,
                1,
                this.audioContext.sampleRate
            )
            this.startRecord()
        })
    }

    /**
     * get musical note from frequency
     *
     * @param {number} frequency
     * @returns {number}
     */
    getNote(frequency: number): number {
        const note = 12 * (Math.log(frequency / this.middleA) / Math.log(2))
        return Math.round(note) + this.semitone
    }

    /**
     * get the musical note's standard frequency
     *
     * @param note
     * @returns {number}
     */
    getStandardFrequency(note: number): number {
        return this.middleA * Math.pow(2, (note - this.semitone) / 12)
    }

    /**
     * get cents difference between given frequency and musical note's standard frequency
     *
     * @param {number} frequency
     * @param {number} note
     * @returns {number}
     */
    getCents(frequency: number, note: number): number {
        return Math.floor(
            (1200 * Math.log(frequency / this.getStandardFrequency(note))) / Math.log(2)
        )
    }

    /**
     * play the musical note
     *
     * @param {number} frequency
     */
    play(frequency: number) {
        if (!this.oscillator) {
            this.oscillator = this.audioContext.createOscillator()
            this.oscillator.connect(this.audioContext.destination)
            this.oscillator.start()
        }
        this.oscillator.frequency.value = frequency
    }

    stop() {
        this.oscillator.stop()
        this.oscillator = null
    }

    stopRecording() {
        if (this.stream) {
            this.stream.getAudioTracks().forEach(track => track.stop())
        }
    }

    setRecorderState(active: boolean) {
        if (active) {
            this.stopRecording()
            this.init()
        } else {
            this.stopRecording()
        }
    }
}
