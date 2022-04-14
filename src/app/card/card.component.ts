import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan.`;
  
  constructor() { }

  ngOnInit(): void {
  }

}
