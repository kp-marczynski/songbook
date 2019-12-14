import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  handleTabChange($event: { tab: string }) {
    let res = this.router.url.match('/tabs/[a-z]+/');
    if(res){
      this.router.navigate([res[0]]);
    }
  }
}
