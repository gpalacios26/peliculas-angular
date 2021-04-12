import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Cast } from 'src/app/interfaces/credits-response';
import Swiper from 'swiper';

@Component({
  selector: 'app-cast-slideshow',
  templateUrl: './cast-slideshow.component.html',
  styleUrls: ['./cast-slideshow.component.css']
})
export class CastSlideshowComponent implements OnInit, AfterViewInit {

  @Input() cast: Cast[];
  public mySwiper: Swiper;

  constructor() { }

  ngAfterViewInit(): void {
    this.mySwiper = new Swiper('.swiper-container', {
      slidesPerView: 5.3,
      freeMode: true,
      spaceBetween: 15,
    })
  }

  ngOnInit(): void {
  }

  onSlidePrev() {
    this.mySwiper.slidePrev();
  }

  onSlideNext() {
    this.mySwiper.slideNext();
  }

}
