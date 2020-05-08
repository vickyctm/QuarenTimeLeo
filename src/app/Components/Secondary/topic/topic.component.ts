import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  @Output() clicked: EventEmitter<any> = new EventEmitter<any>();
  

  @Input() title: string;
  @Input() isSelected: boolean;
  @Input() color: string;
  @Input() pointer: number;

  editing = false;
  inputText = this.title;

  colors = [
    '#E3B9BC',
    '#AA9ABA',
    '#8783D1'
  ];

  constructor() { }

  editTitle() {
    this.title = this.inputText;
    this.editing = false;
    
  }

  emitDeleteEvent() {
    this.delete.emit();
  }
  emitClickedEvent() {
    this.clicked.emit();
  }

  changeColor(index) {
    this.color = this.colors[index];
    console.log(this.color);
  }

  ngOnInit(): void {
    this.inputText = this.title;
  }
}
