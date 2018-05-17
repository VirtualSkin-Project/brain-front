import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {

  @Input() text: string;
  
  @Output() onclick = new EventEmitter();

  constructor() { }
  
  ngOnInit(){
    console.log(this.text);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['text'].currentValue);
  }

  click() {
    this.onclick.emit('hahahahahaha');
  }
}
