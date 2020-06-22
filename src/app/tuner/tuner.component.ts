import {Component, OnInit} from '@angular/core';
import {FrequencyBars} from "./frequency-bars";
import {TunerService} from "./tuner.service";
import {NavigationStart, Router} from "@angular/router";
import {Note} from "./notes/note.model";

@Component({
    selector: 'app-tuner',
    templateUrl: './tuner.component.html',
    styleUrls: ['./tuner.component.scss'],
})
export class TunerComponent implements OnInit {

    frequencyBars: FrequencyBars;
    frequencyData: Uint8Array;
    lastNote: Note;
    meterPointer: number;
    activeNote: Note;

    constructor(private tuner: TunerService, router: Router) {
        router.events.forEach((event) => {
            if (event instanceof NavigationStart) {
                tuner.setRecorderState(event.url.includes("tuner"))
            }
        }).then();
        document.addEventListener('visibilitychange', () => {
            tuner.setRecorderState(!(document.visibilityState == 'hidden' || !router.url.includes("tuner")))
        });
    }

    ngOnInit() {
        this.frequencyBars = new FrequencyBars('.frequency-bars')
        this.update({name: 'A', frequency: 440, octave: 4, value: 69, cents: 0})
        this.init()
    }

    update(note: Note) {
        this.activeNote = note;
        this.meterPointer = (note.cents / 50) * 45;
    }

    updateFrequencyBars() {
        if (this.tuner.analyser) {
            this.tuner.analyser.getByteFrequencyData(this.frequencyData)
            this.frequencyBars.update(this.frequencyData)
        }
        requestAnimationFrame(this.updateFrequencyBars.bind(this))
    }

    init(): void {
        this.tuner.onNoteDetected = note => {
            if (this.lastNote && this.lastNote.name === note.name && this.lastNote.octave === note.octave) {
                this.update(note)
            } else {
                this.lastNote = note;
            }
        }

        this.tuner.init()
        this.frequencyData = new Uint8Array(this.tuner.analyser.frequencyBinCount)

        this.updateFrequencyBars()
    }
}
