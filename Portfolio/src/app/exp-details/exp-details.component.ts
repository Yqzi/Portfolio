import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-exp-details',
  standalone: true,
  imports: [MatIconModule ],
  templateUrl: './exp-details.component.html',
  styleUrl: './exp-details.component.css'
})
export class ExpDetailsComponent {
  @Input('startDate') startDate: String;
  @Input('EndDate') EndDate: String;
  @Input('skill') skill: String;
  @Input('skillDesc') skillDesc: String;

  constructor() {
    this.EndDate = this.EndDate ?? 'PRESENT'
    this.skillDesc = this.skillDesc ?? 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore';
  }
}
