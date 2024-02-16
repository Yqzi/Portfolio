import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { EventEmitter } from 'stream';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  constructor() { 
  }
  ngOnDestroy(): void {
    this.h.unsubscribe();
  }
  ngOnInit(): void {
    console.log(this.x);
  }

  h = new Subject<number>();

  x = 0;

  // personalDesc: string = "I'm a Tunisian based web designer & front‑end  developer focused on crafting clean & user‑friendly experiences, I am passionate about building excellent software that improves the lives of those around me."
  @ViewChild('background',  {static: true}) bg: ElementRef;
  @ViewChild('gg',  {static: true}) grad: ElementRef;

  
  @HostListener('window:scroll', ['$event']) onScroll(_) {
    var value = window.scrollY;
    this.x = value;
    console.log(this.x)
  }


}
