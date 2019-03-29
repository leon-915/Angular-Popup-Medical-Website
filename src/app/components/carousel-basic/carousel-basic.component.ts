import { Component } from '@angular/core';

@Component({selector: 'app-ngbd-carousel-basic', templateUrl: './carousel-basic.component.html'})
export class NgbdCarouselBasicComponent {
  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
}
