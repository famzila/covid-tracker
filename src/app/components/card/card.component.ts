import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { IStats } from 'shared/interfaces/interfaces';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, AfterViewInit {
  @Input() subText: string = 'Covid stats';
  @Input() stats: string | undefined;
  
  statsNum: string | undefined = "";
  longText = `The Shiba Inu is the`;
  statsTotal : number | undefined = 999;
  
  constructor() { }

  ngAfterViewInit(): void {
    this.buildStatsLongText();
  }

  ngOnInit(): void {
  }

  buildStatsLongText(){
    // switch (this.subText?.toLowerCase()) {
    //   case 'cases':
    //     this.statsNum = this.stats?.new ? this.stats?.new : `${this.stats?.active}`;
    //     this.longText = `${this.stats?.new} new cases, ${this.stats?.critical} critical cases, ${this.stats?.active} active covid patients and ${this.stats?.recovered} recovered.`;
    //     break;
    //   case 'deaths':
    //     this.statsNum = `${this.stats?.total}`;
    //     this.longText= "Deaths";
    //     break;
    //   case 'tests':
    //     this.statsNum =  `${this.stats?.total}`;
    //     this.longText= "Tests";
    //     break;
    //   default:
    //     break;
    // }
  }
}
