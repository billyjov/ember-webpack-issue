import { Component, OnInit } from '@angular/core';
import { ScriptLoaderService } from '../script-loader.service';

@Component({
  selector: 'app-b',
  templateUrl: './b.component.html',
  styleUrls: ['./b.component.css']
})
export class BComponent implements OnInit {

  constructor(private scriptLoader: ScriptLoaderService) { }

  ngOnInit(): void {
    // this.scriptLoader.load('list').then(() => {
    //   console.log('hello ember list loaded correctly')
    // })
  }

}
