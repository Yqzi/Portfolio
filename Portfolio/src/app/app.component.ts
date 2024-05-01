import { Component, ModuleWithProviders, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    ActivatedRoute,
    ExtraOptions,
    RouterModule,
    RouterOutlet,
} from '@angular/router';
import { ExpCardComponent } from './exp-card/exp-card.component';
import { User } from './user.model';
import { Skills } from './skills';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ExpDetailsComponent } from './exp-details/exp-details.component';
import { MatIconModule } from '@angular/material/icon';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';

const extraOption: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload',
};

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
        CommonModule,
        RouterOutlet,
        ExpCardComponent,
        NgCircleProgressModule,
        ExpDetailsComponent,
        MatIconModule,
        ContactFormComponent,
        RouterModule,
        PhotoGalleryComponent,
    ],
    providers: [
        (
            NgCircleProgressModule.forRoot() as ModuleWithProviders<NgCircleProgressModule>
        ).providers!,
    ],
})
export class AppComponent implements OnInit {
    skills1 = [
        ['FLUTTER', 80],
        ['PYTHON', 60],
        ['FIREBASE', 60],
        ['SQL', 50],
    ];

    skills2 = [
        ['ANGULAR', 45],
        ['JAVASCRIPT', 45],
        ['TAILWIND', 45],
        ['TYPESCRIPT', 45],
    ];

    user: User;
    options: Skills;
    options2: Skills;
    constructor(private activatedRoute: ActivatedRoute) {
        this.user = User.Yusuf();
        this.options = Skills.getOptions('#4882c2');
        this.options2 = Skills.getOptions('#9b834d');
    }

    jumpTo(section) {
        document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
    }

    newTab(url) {
        window.open(url);
    }

    // The screen starts with the maximum opacity
    public opacityChange = 1;

    public splashTransition;

    // First access the splash is visible
    public showSplash = true;

    readonly ANIMATION_DURATION = 1;

    private hideSplashAnimation() {
        console.log('a');
        setTimeout(() => {
            console.log('a');
            // Setting the transition
            this.splashTransition = `opacity ${this.ANIMATION_DURATION}s`;
            this.opacityChange = 0;
            // After the transition is ended the showSplash will be hided
            this.showSplash = false;
        }, 1000);
        console.log('a');
    }

    ngOnInit(): void {
        this.activatedRoute.fragment.subscribe((value) => {
            this.jumpTo(value);
        });

        this.hideSplashAnimation();
    }
}
