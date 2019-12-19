import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {StorageHelperService} from '../services/storage-helper.service';
import {TabsService} from '../services/tabs.service';
import {SongService} from '../services/song.service';
import {Song} from '../model/song.model';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private storageHelperService: StorageHelperService,
        private songService: SongService,
        public tabs: TabsService
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
        if (!document.body.classList.contains('dark')) {
            this.storageHelperService.getDarkMode().then((res: boolean) => {
                document.body.classList.toggle('dark', res);
            });
        }
        this.addSampleData();
    }

    addSampleData() {
        const songText = "[N.C.]Is this real life Is the just fantasy? \n" +
            "Caught in a landslide, no escape from reality.\n" +
            "\n" +
            "[Gm]Open your eyes\n" +
            "Look [Bb]up to the skies and se[Eb]e\n" +
            "[Cm(7)]I'm just a poor boy, I[F] need no sympathy\n" +
            "[B]easy [Bb]come, e[A]ays [Bb]go, l[B]ittle [Bb]high, [A]little [Bb]low                     \n" +
            "[Eb]Any way the win[Bb/D]d blows, doe[C#dim]sn't realy matter[F7/C] to me    [F7/Eb] to me. [B]\n" +
            "\n" +
            "[Bb]Mama   just killed [Gm]a man\n" +
            "put a g[Cm]un against his head, pulled my t[Cm7]rigger, now he's de[F]ad\n" +
            "[Bb]Mama  life had ju[Gm]st begun, but no[Cm]w I've gone and t[G+5/B]hrown it[Eb/Bb] all away [Adi]\n" +
            "[Eb]Mama [Bb/D]Oooo  didn't me[Fm]an to make[C/E] you[Ab/Eb] cry, [Ddim]if I'm n[Bb]ot back agai[Bb6]n this[Bb7] time \n" +
            "tomar[Eb]row, \n" +
            "Carry [Bb/D]on, carr[Cm]y on as if noth[Abm]ing really ma[Eb]tters.\n" +
            "Too late, my time has c[Gm]ome \n" +
            "Sent s[Cm]hivers down my spine, [Cm7]body's achin' all the tim[F]e,\n" +
            "[Bb]Goodbye everybody, I've [Gm]got to go,\n" +
            "Gotta le[Cm]ave you all behi[G+5/B]nd and fac[Eb/Bb]e the t[Adim]ruth.    [Abmaj7]  [Eb/]\n" +
            "[Eb]Mama O[Bb/D]oo   [Cm]  I [Fm]don't wan[C/E]t to[Ab/Eb] die, [Ddim]I some[Bb]times wish I[Bb6]'d never been[Bb7] born at all.\n" +
            "\n" +
            "[D/A]I  se[A]e [Adim] a little[A]  silhoue[D/A]tto  o[A]f  a  [Adim]man\n" +
            "[A]Scarmo[D/A]uch  [A]Scarm[D/A]ouch [A] will  you[Adim]  do  the [A] fa[D/A]ndang[A]o?\n" +
            "[C#/G#]Thunder  [G#]bolts  an[C#/G#]d  light[G#]ening  v[C/G]ery  very  f[E7]rightening  [A]me\n" +
            "Galileo  Galileo Galileo G[N.C.]alileofigaro Mangnifico oh oh oh\n" +
            "[B]I'm  [Bb]just  a  p[A]oor  [Bb]boy  [B]nobod[Bb]y  lo[A]ves  [Bb]me\n" +
            "[Ab/Eb]He's  ju[Eb]st  a  [Ebdim]poor  [Eb]boy,  [Ab/Eb]from  a [Eb] poor[Ebdim]  family [Eb]\n" +
            "[Ab]spare  him  his  lif[Eb/G]e  from  this  m[F7]onstrosit[Bb]y\n" +
            "\n" +
            "[AAb/Eb] [Eb] [Cdim] [Bb7sus4b]\n" +
            "[B]Easy  c[Bb]ome  ea[A]sy  g[Bb]o  wi[B]ll  you  let [Bb] me  go?    [Bbdi]\n" +
            "B[Bb5]ismil[Eb]lah[Bb5]   N[Eb]O, [Bbsus4] we  wil[Bb]l  not [Bbsus4] let  you[Bb]  go\n" +
            "{npp}\n" +
            "Let  him  go\n" +
            "[Bb]Bism[Eb]ill[Bb]ah  we  will [Bbsus4] not  le[Bb]t  [Bbsus4]you  go[Bb]      Let  him  go\n" +
            "[Bb]bism[Eb]ill[Bb]ah  we  will [Bbsus4] not  le[Bb]t  [Bbsus4]you  go[Bb]      Let  me   go\n" +
            "[Bbsus4]will  n[Bb]ot [Bbsus4] let  y[Bb]ou  go   let  me  go   [Bbsus4]will  n[Bb]ot [Bbsus4] let  y[Bb]ou  go\n" +
            "let  me  go oh  oh  oh  oh oh\n" +
            "no [A5] no  [D]no  [Db]no  [Gb]no [Bb5] no [Eb5] no  Oh mamamia mamamia  m[Eb]ama[Ab]mia[Eb]  l[N.C.]et  me[Bb]  go\n" +
            "Be[Eb]elzebu[Ab]b  has  a [D7] devil  put  as[Gm]ide  for  m[Bb5]e   for  me  for me\n" +
            "\n" +
            "\n" +
            "[Cm]Nothing really ma[Gm]tters, an[Cm]yone can s[Gm]ee\n" +
            "[Cm]nothing raelly ma[AbM]tters,  [Ab/Bb]nothing really matters to [Eb]me      [Ab/Eb]  [E]\n" +
            "\n" +
            "[EEbdim]  [Bb/D]   [Dbmaj13]   [C]   [Dbdim]   [C]    [F]  \n" +
            "[Bb]Any way[F] the wi[Fdim]nd blo[C7sus4]ws";
        const song = new Song(null, "Bohemian Rhapsody", "Queen", "en", songText);

        this.songService.getSongIndex().then(res => {
            if (!res || res.length === 0) {
                this.songService.saveSong(song);
            }
        });
    }
}
