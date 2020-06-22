import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Note} from "./note.model";
import {TunerService} from "../tuner.service";

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.scss'],
})
export class NotesComponent {

    activeNote: Note;
    notes: Note[] = [];
    frequency: number;

    constructor(private tuner: TunerService) {
        this.createNotes()
    }

    @ViewChild('notesList', {static: false}) notesListRef: ElementRef;

    @Input() set note(note) {
        const newActive = this.notes.find(elem => elem.name === note.name && elem.octave == note.octave)
        if (newActive) {
            this.activeNote = newActive
        }

        this.frequency = note.frequency.toFixed(1);
        this.scrollToActiveNote()
    }

    private scrollToActiveNote() {
        if (this.notesListRef) {
            const notesElement = this.notesListRef.nativeElement
            const children = notesElement.children as HTMLCollection
            for (let i = 0; i < children.length; i++) {
                if (children[i].classList.contains("active")) {
                    const activeChild = (children[i] as HTMLElement)
                    this.notesListRef.nativeElement.scrollLeft = activeChild.offsetLeft - (notesElement.clientWidth - activeChild.clientWidth) / 2;
                }
            }
        }
    }

    createNotes() {
        const minOctave = 2
        const maxOctave = 5
        for (let octave = minOctave; octave <= maxOctave; octave += 1) {
            for (let n = 0; n < 12; n += 1) {
                const noteValue = (12 * (octave + 1) + n)

                const note = new Note(this.tuner.noteStrings[n], noteValue, octave, this.tuner.getStandardFrequency(noteValue))
                this.notes.push(note);
            }
        }
    }
}
