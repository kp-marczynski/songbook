export class ChordProGroup {
    chords: string[];
    simpleChords: string[];
    textLines: string[];

    constructor(chords: string[], textLines: string[]) {
        this.chords = chords;
        this.textLines = textLines;
        this.simpleChords = [];
        chords.forEach(chordLine => {
            this.simpleChords.push(chordLine.replace(new RegExp('_', 'g'), ''));
        });
    }
}
