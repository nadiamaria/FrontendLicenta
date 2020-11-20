import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public recipes = [ {
    name : "orez cu lapte",
    description : "orez + lapte"
    },
    {
    name : "clatite cu gem",
    description : "clatite + gem"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
