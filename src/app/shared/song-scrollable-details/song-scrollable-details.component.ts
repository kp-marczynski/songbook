import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ISong} from "../../../model/song.model";
import {IChordProGroup} from "../../../model/chord-pro-group.model";
import {SongService} from "../../../services/song.service";
import {CampfireService} from "../../../services/campfire.service";
import {ChordProService} from "../../../services/chord-pro.service";
import {IonContent} from "@ionic/angular";

@Component({
    selector: 'app-song-scrollable-details',
    templateUrl: './song-scrollable-details.component.html',
    styleUrls: ['./song-scrollable-details.component.scss'],
})
export class SongScrollableDetailsComponent implements OnInit {

    @Input() song: ISong;
    @Input() scrollSpeed: number;
    @Input() isScrolling: boolean;
    @Input() isScrollPaused: boolean;
    @Input() chordsVisible: boolean;
    @ViewChild(IonContent, {static: false}) content: IonContent;

    @Output() scrollStateChanged = new EventEmitter();

    formattedContent: IChordProGroup[];
    simpleChords = true;

    baseSpeed = 6;
    scrollSpeedDecimals = 2;
    wheeling;

    constructor(private songService: SongService,
                private campfireService: CampfireService,
                private chordProService: ChordProService) {
    }

    ngOnInit(): void {
        this.displaySong();
        this.registerScrollListeners();
    }

    displaySong() {
        if (!this.song) {
        } else {
            this.formattedContent = this.chordProService.parseChordPro(this.song.content);
            if (this.content) {
                this.content.scrollToTop();
            }
        }
    }

    private registerScrollListeners() {
        window.addEventListener('wheel', event => {
            if (!this.wheeling && this.isScrolling) {
                this.isScrollPaused = true;
            }

            clearTimeout(this.wheeling);
            this.wheeling = setTimeout(() => {
                if (this.isScrollPaused) {
                    this.isScrollPaused = false;
                    this.performScroll();
                }
                this.wheeling = undefined;
            }, 250);
        });

        window.addEventListener('touchstart', event => {
            if (this.isScrolling) {
                this.isScrollPaused = true;
            }
        });

        window.addEventListener('touchend', event => {
            if (this.isScrollPaused) {
                this.isScrollPaused = false;
                this.performScroll();
            }
        });
    }

    performScroll() {
        this.content.getScrollElement().then((element: HTMLElement) => {
            this.performScrollRecursive(this.calculateScrollableHeight(element), element.scrollTop);
        });
    }

    private calculateScrollableHeight(element: HTMLElement): number {
        const songDetailsListElement = document.getElementById('song-details-list');
        return !!songDetailsListElement ? songDetailsListElement.scrollHeight
            + element.getBoundingClientRect().top + element.getBoundingClientRect().bottom
            - 2 * element.offsetHeight : 0;
    }

    private performScrollRecursive(scrollableHeight: number, scrollOffset: number) {
        if (this.isScrolling && !this.isScrollPaused) {
            scrollOffset += this.scrollSpeed * this.baseSpeed / Math.pow(10, this.scrollSpeedDecimals * 2);
            if (scrollOffset >= scrollableHeight) {
                this.changeScrollState(false);
            }
            this.content.scrollToPoint(0, scrollOffset).then(() => {
                setTimeout(() => this.performScrollRecursive(scrollableHeight, scrollOffset));
            });
        }
    }

    changeScrollState(scroll: boolean) {
        this.isScrolling = scroll;
        this.scrollStateChanged.emit(scroll);
    }

    getGroupChords(group: IChordProGroup, index: number) {
        return this.simpleChords ? group.simpleChords[index] : group.chords[index];
    }


    startScroll() {
        this.changeScrollState(true);
        this.performScroll();
    }

    pauseScrolling() {
        this.changeScrollState(false);
    }

    changeScrollSpeed(value: number): number {
        this.scrollSpeed = this.scrollSpeed + value > 0
            ? this.scrollSpeed + value
            : 0;
        return this.scrollSpeed;
    }
}
