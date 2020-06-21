import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FrequencyBars} from "./frequency-bars";
import {TunerService} from "./tuner.service";
import {NavigationStart, Router} from "@angular/router";

@Component({
    selector: 'app-tuner',
    templateUrl: './tuner.component.html',
    styleUrls: ['./tuner.component.scss'],
})
export class TunerComponent implements OnInit {

    frequencyBars: FrequencyBars;
    frequencyData: any;
    lastNote: any;
    meterPointer: number;
    activeNote: any;

    constructor(private tuner: TunerService, router: Router) {
        router.events.forEach((event) => {
            if (event instanceof NavigationStart) {
                tuner.setRecorderState(event.url.includes("tuner"))
            }
        }).then();
        document.addEventListener('visibilitychange', () => {
            tuner.setRecorderState(document.visibilityState == 'visible')
        });
    }

    ngOnInit() {
        this.frequencyBars = new FrequencyBars('.frequency-bars')
        this.update({name: 'A', frequency: 440, octave: 4, value: 69, cents: 0})
        this.init()
    }

    update(note) {
        this.activeNote = note;
        this.meterPointer = (note.cents / 50) * 45;
    }

    toggleAutoMode() {
        // this.notes.toggleAutoMode();
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
            // if (this.notes.isAutoMode) {
            if (this.lastNote === note.name) {
                this.update(note)
            } else {
                this.lastNote = note.name
            }
            // }
        }

        this.tuner.init()
        this.frequencyData = new Uint8Array(this.tuner.analyser.frequencyBinCount)

        this.updateFrequencyBars()
    }
}
