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
    let p = this.document.getElementById('parallax');
    window.addEventListener('scroll', () => {
      var value = window.scrollY;
      if (value > 800) value = 800;
      console.log(value);


      let bgY = -210 + value * 1.24;
      if (bgY > 0) bgY = 0;
      bg.style.transform = "translateY(" + bgY + 'px)';

      let cliffY = -270 + value * -0.5;
      if (cliffY < -700) cliffY = -700;
      cliff.style.transform = "translateY(" + cliffY + 'px)';
      console.log(cliff.style.transform);

      // grad.style.height = 10 + value * 0.02  + 'vh';
      p.style.height = 100 -  (value * 0.11)  + 'vh';
    })
  }

  
}
