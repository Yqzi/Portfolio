import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-exp-card',
  standalone: true,
  imports: [],
  templateUrl: './exp-card.component.html',
  styleUrl: './exp-card.component.css'
})
export class ExpCardComponent {
  @Input('years') years: number;
  
}
