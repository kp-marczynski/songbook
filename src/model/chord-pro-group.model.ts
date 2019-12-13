export class ChordProGroup {
    chords: string;
    simpleChords: string;
    textLines: string[];


    constructor(chords: string, textLines: string[]) {
        this.chords = chords;
        this.textLines = textLines;
        this.simpleChords = chords.replace(new RegExp('_', 'g'), '');
    }
}
