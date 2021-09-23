import { Component, OnInit } from '@angular/core';
import { ScriptLoaderService } from '../script-loader.service';

@Component({
  selector: 'app-a',
  templateUrl: './a.component.html',
  styleUrls: ['./a.component.css'],
})
export class AComponent implements OnInit {
  // public elementUrl = 'assets/landscapes/landscapes.js';

  constructor(private scriptLoader: ScriptLoaderService) {}

  ngOnInit(): void {
    this.scriptLoader.load('landscapes').then(() => {
      console.log('script loaded');
    })
  }
}
