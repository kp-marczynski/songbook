export interface IMinimalSong {
    id: string;
    l: string;
    a: string;
    t: string;
}

export class MinimalSong implements IMinimalSong {
    constructor(
        public id: string,
        public l: string,
        public a: string,
        public t: string
    ) {
    }
}
