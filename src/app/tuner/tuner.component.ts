import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Notes} from "./notes";
import {Tuner} from "./tuner";
import {FrequencyBars} from "./frequency-bars";

@Component({
    selector: 'app-tuner',
    templateUrl: './tuner.component.html',
    styleUrls: ['./tuner.component.scss'],
})
export class TunerComponent implements OnInit {

    notes: Notes;
    tuner: Tuner;
    frequencyBars: FrequencyBars;
    frequencyData: any;
    lastNote: any;
    meterPointer: number;

    constructor() {
    }

    ngOnInit() {
        this.tuner = new Tuner()
        this.notes = new Notes('.notes', this.tuner)
        this.frequencyBars = new FrequencyBars('.frequency-bars')
        this.update({ name: 'A', frequency: 440, octave: 4, value: 69, cents: 0 })
        this.init()
    }

    update(note) {
        this.notes.update(note);
        this.meterPointer = (note.cents / 50) * 45;
    }

    toggleAutoMode() {
        this.notes.toggleAutoMode();
    }

    updateFrequencyBars() {
        if (this.tuner.analyser) {
            this.tuner.analyser.getByteFrequencyData(this.frequencyData)
            this.frequencyBars.update(this.frequencyData)
        }
        requestAnimationFrame(this.updateFrequencyBars.bind(this))
    }

    init(): void {
        this.tuner.onNoteDetected = (note) => {
            if (this.notes.isAutoMode) {
                if (this.lastNote === note.name) {
                    this.update(note)
                } else {
                    this.lastNote = note.name
                }
            }
        }

        this.tuner.init()
        this.frequencyData = new Uint8Array(this.tuner.analyser.frequencyBinCount)

        this.updateFrequencyBars()
    }
}
