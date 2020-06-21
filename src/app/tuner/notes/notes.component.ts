import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Note} from "./note.model";
import {TunerService} from "../tuner.service";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent {

  @ViewChild('notesList', {static: false}) notesListRef: ElementRef;

  @Input() set note(note) {
    this.activeNote = this.notes.find(elem => elem.name === note.name && elem.octave == note.octave)
    this.frequency = note.frequency.toFixed(1);


    if(this.notesListRef){
      const notesElement = this.notesListRef.nativeElement
      const children = notesElement.children as HTMLCollection
      for (let i = 0; i < children.length; i++) {
        if(children[i].classList.contains("active")){
          const activeChild = (children[i] as HTMLElement)
          this.notesListRef.nativeElement.scrollLeft = activeChild.offsetLeft - (notesElement.clientWidth - activeChild.clientWidth)/2;
        }
      }
      // this.notesListRef.nativeElement.children.find(elem=>elem.firstChild.textContent === this.activeNote.name)
    }
  }

  activeNote: Note;
  isAutoMode = true
  notes: Note[] = [];
  frequency: number;

  constructor(private tuner: TunerService) {
    this.createNotes()
  }

  createNotes() {
    const minOctave = 2
    const maxOctave = 5
    for (let octave = minOctave; octave <= maxOctave; octave += 1) {
      for (let n = 0; n < 12; n += 1) {
        // const $note = document.createElement('div')
        const noteValue = (12 * (octave + 1) + n).toString()

        const note = new Note(this.tuner.noteStrings[n], noteValue, octave.toString(), this.tuner.getStandardFrequency(noteValue))
        // this.notes[noteValue]=(note);
        this.notes.push(note);
      }
    }

    // this.$notes.forEach($note => {
    //   $note.addEventListener('click', () => {
    //     if (this.isAutoMode) {
    //       return
    //     }
    //
    //     const $active = this.$notesList.querySelector('.active')
    //     if ($active === this) {
    //       this.tuner.stop()
    //       $active.classList.remove('active')
    //     } else {
    //       this.tuner.play(this.dataset.frequency)
    //       this.update($note.dataset)
    //     }
    //   })
    // })
  }

  // toggleAutoMode() {
  //   if (this.isAutoMode) {
  //     this.clearActive()
  //   }
  //   this.isAutoMode = !this.isAutoMode
  // }
}
