import { Component, OnInit } from '@angular/core';
import { ScriptLoaderService } from '../script-loader.service';

@Component({
  selector: 'app-a',
  templateUrl: './a.component.html',
  styleUrls: ['./a.component.css'],
})
export class AComponent implements OnInit {
  constructor(private scriptLoader: ScriptLoaderService) {}

  ngOnInit(): void {
    this.scriptLoader.load('list').then(() => {
      console.log('hello ember list loaded correctly');
    });
  }
}
