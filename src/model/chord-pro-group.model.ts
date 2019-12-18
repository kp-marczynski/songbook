export interface IChordProGroup {
    chords: string[];
    simpleChords: string[];
    textLines: string[];
}

export class ChordProGroup implements IChordProGroup {
    simpleChords: string[];

    constructor(public chords: string[], public textLines: string[]) {
        this.chords = chords;
        this.textLines = textLines;
        this.simpleChords = [];
        chords.forEach(chordLine => {
            this.simpleChords.push(chordLine.replace(new RegExp('_', 'g'), ''));
        });
    }
}
