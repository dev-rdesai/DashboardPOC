import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
//   moduleId: module.id,
  selector: 'hr-mod',
  templateUrl: './hr.component.html',
  styleUrls: ['./hr.component.css']
})
export class HrComponent {
  @Input() counterVal;
  @Output() emitClickCounts;
  clickCounter: number = 0;
  name = 'HR Component';

  onClickInsideContent() {
    this.clickCounter += 1;
    this.emitClickCounts(this.clickCounter);
  }
}
