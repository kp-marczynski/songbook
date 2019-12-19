import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RouterExtService} from '../../../services/router-ext.service';
import {SongService} from '../../../services/song.service';
import {ISong, Song} from '../../../model/song.model';

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
        private songService: SongService,
        private routerExtService: RouterExtService,
        private router: Router) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.songService.getSong(params.get('uuid')).then(res => {
                if (res) {
                    this.updateForm(res);
                }
            });
        });
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            const prevUrl = this.routerExtService.getPreviousUrl();
            this.previousUrl = prevUrl ? prevUrl : '/tabs/song';
        });
    }

    updateForm(song: ISong) {
        this.editForm.patchValue({
            uuid: song.uuid,
            title: song.title,
            author: song.author,
            language: song.language,
            content: song.content
        });
    }

    private createFromForm(): ISong {
        return new Song(
            this.editForm.get(['uuid']).value,
            this.editForm.get(['title']).value,
            this.editForm.get(['author']).value,
            this.editForm.get(['language']).value,
            this.editForm.get(['content']).value);
    }

    save() {
        this.isSaving = true;
        const song = this.createFromForm();
        // console.log(song);
        this.songService.saveSong(song).then(() => this.previousState());
    }

    previousState() {
        this.router.navigate([this.previousUrl]);
    }
}
