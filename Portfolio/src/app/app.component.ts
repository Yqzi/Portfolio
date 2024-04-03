import {  Component, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ExpCardComponent } from './exp-card/exp-card.component';
import { User } from './user.model';
import { Skills } from "./skills";
import { CircleProgressOptions, NgCircleProgressModule } from 'ng-circle-progress';
import { ExpDetailsComponent } from './exp-details/exp-details.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, ExpCardComponent, NgCircleProgressModule, ExpDetailsComponent],
    providers: [
      (NgCircleProgressModule.forRoot() as ModuleWithProviders<NgCircleProgressModule>).providers!,
    ]
})
export class AppComponent {
  
  skills = [
    ["FIGMA", 75],
    ["HTML", 75],
    ["CSS", 75],
    ["PHP", 75],
    ["UI/UX", 75],
    ["PHOTOSHOP", 75],
    ["GRAPHICS", 75],
    ["ILLUSTRATOR", 75]
  ];

  user: User;
  options: Skills;
  constructor() {
    this.user = User.Yusuf();
    this.options = Skills.getOptions();
   }
}
