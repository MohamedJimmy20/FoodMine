import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { withLatestFrom } from 'rxjs';

@Component({
  selector: 'default-buttom',
  templateUrl: './default-buttom.component.html',
  styleUrls: ['./default-buttom.component.css']
})
export class DefaultButtomComponent implements OnInit {

  @Input()
  type: 'submit' | 'buttom' = 'submit';
  @Input()
  text: string = 'submit';
  @Input()
  bgColor= '#e72929';
  @Input()
  color= 'white';
  @Input()
  fontSizeRem = 1.3;
  @Input()
  widthRem = 12;
  @Output()
  onClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
