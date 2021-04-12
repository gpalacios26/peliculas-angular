import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from 'src/app/interfaces/cartelera-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public moviesSlideshow: Movie[];
  public movies: Movie[];

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if (pos > max) {
      if (this.peliculasService.cargando) {
        return;
      }

      this.peliculasService.getCartelera().subscribe(
        response => {
          this.movies.push(...response);
        }
      );
    }
  }

  constructor(
    private peliculasService: PeliculasService
  ) { }

  ngOnInit(): void {
    this.getCartelera();
  }

  ngOnDestroy() {
    this.peliculasService.resetCarteleraPage();
  }

  getCartelera() {
    this.peliculasService.getCartelera().subscribe(
      response => {
        this.moviesSlideshow = response;
        this.movies = response;
      }
    );
  }

}
