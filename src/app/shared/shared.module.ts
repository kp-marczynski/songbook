import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SongListItemComponent} from "./song-list-item/song-list-item.component";
import {SongScrollableDetailsComponent} from "./song-scrollable-details/song-scrollable-details.component";
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {CurrentSongShareComponent} from "./current-song-share/current-song-share.component";
import {CurrentSongSharePopoverService} from "./current-song-share/current-song-share-popover.service";
import {QRCodeModule} from "angular2-qrcode";


@NgModule({
    declarations: [
        SongListItemComponent,
        SongScrollableDetailsComponent,
        CurrentSongShareComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        QRCodeModule,
    ],
    exports: [
        SongListItemComponent,
        SongScrollableDetailsComponent,
        CurrentSongShareComponent
    ],
    entryComponents: [CurrentSongShareComponent],
    providers: [CurrentSongSharePopoverService]

})
export class SharedModule {
}
