import { AfterViewInit, Component, HostListener, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngAfterViewInit(): void {
  
  }

  @HostListener("window:scroll") onScroll() {
    let bg = this.document.getElementById('bg');
    let cliff = this.document.getElementById('cliff');
    let grad = this.document.getElementById('grad');
    window.addEventListener('scroll', () => {
      var value = window.scrollY;
      console.log(value);

      bg.style.top = 0 + value * 1.24 + 'px';
      cliff.style.top = 0 + value * 0.7 + 'px';

      grad.style.height = 10 + value * 0.02  + 'vh';
    })
  }

  
}
