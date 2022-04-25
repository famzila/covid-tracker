import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() subText: string = 'Covid stats';
  @Input() stats: string | undefined;
  
  statsNum: string | undefined = "";
  longText = "";
  statsTotal : number | undefined = 999;
  
  constructor() { }

}
