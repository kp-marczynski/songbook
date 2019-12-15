import {AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ChordProGroup} from '../../../model/chord-pro-group.model';
import {Song} from '../../../model/song.model';
import {ActivatedRoute} from '@angular/router';
import {StorageHelperService} from '../../../services/storage-helper.service';
import {RouterExtService} from "../../../services/router-ext.service";

@Component({
    selector: 'app-song-edit',
    templateUrl: './song-edit.component.html',
    styleUrls: ['./song-edit.component.scss'],
})
export class SongEditComponent implements OnInit, AfterViewInit {

    isSaving = false;
    previousUrl = '';

    editForm = this.fb.group({
        uuid: [null],
        title: [null, [Validators.required]],
        author: [null, [Validators.required]],
        language: [null, [Validators.required]],
        content: ['']
    });

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private storageHelperService: StorageHelperService,
        private routerExtService: RouterExtService) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.storageHelperService.getSong(params.get('uuid')).then(res => {
                if (res) {
                    this.updateForm(res);
                }
            });
        });
    }

    updateForm(song: Song) {
        this.editForm.patchValue({
            uuid: song.uuid,
            title: song.title,
            author: song.author,
            language: song.language,
            content: song.content
        });
    }

    private createFromForm(): Song {
        return new Song(
            this.editForm.get(['title']).value,
            this.editForm.get(['author']).value,
            this.editForm.get(['language']).value,
            this.editForm.get(['content']).value,
            this.editForm.get(['uuid']).value);
    }

    save() {
        this.isSaving = true;
        const song = this.createFromForm();
        console.log(song);
        this.storageHelperService.saveSong(song).then(() => this.previousState());
    }

    previousState() {
        const prevUrl = this.routerExtService.getPreviousUrl();
        return prevUrl ? prevUrl : '/tabs/song';
    }

    ngAfterViewInit(): void {
        setTimeout(() =>
            this.previousUrl = this.previousState());
    }
}
