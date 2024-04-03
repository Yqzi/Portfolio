import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-exp-details',
  standalone: true,
  imports: [],
  templateUrl: './exp-details.component.html',
  styleUrl: './exp-details.component.css'
})
export class ExpDetailsComponent {
  @Input('startDate') startDate: String;
  @Input('EndDate') EndDate: String;
  @Input('skill') skill: String;
  @Input('skillDesc') skillDesc: String;

  constructor() {
    this.EndDate ?? 'PRESENT';
    this.skillDesc ?? 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore';
  }
}
