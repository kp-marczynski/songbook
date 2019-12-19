import {Injectable, NgZone} from '@angular/core';
import {auth} from 'firebase/app';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {IUser} from '../model/user.model';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    user: IUser;

    constructor(
        public router: Router,
        public ngZone: NgZone,
        public angularFireAuth: AngularFireAuth
    ) {
        this.angularFireAuth.authState.subscribe(user => {
            this.user = user;
        });
    }

    private oAuthProvider(provider) {
        return this.angularFireAuth.auth.signInWithRedirect(provider)
            .then((res) => {
                this.ngZone.run(() => {
                    // this.router.navigate(['/']);
                });
            }).catch((error) => {
                window.alert(error);
            });
    }

    signInWithGoogle() {
        return this.oAuthProvider(new auth.GoogleAuthProvider())
            .then(res => {
                console.log('Successfully logged in!');
            }).catch(error => {
                console.log(error);
            });
    }

    signOut() {
        return this.angularFireAuth.auth.signOut().then(() => {
            // this.router.navigate(['login']);
        });
    }
}
