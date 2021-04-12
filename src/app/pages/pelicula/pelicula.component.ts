import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MovieResponse } from 'src/app/interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Cast } from 'src/app/interfaces/credits-response';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public pelicula: MovieResponse;
  public cast: Cast[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private peliculasService: PeliculasService
  ) { }

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;
    if (id && id != null) {
      this.getPeliculaDetalle(id);
    }
  }

  getPeliculaDetalle(id: string) {
    combineLatest([
      this.peliculasService.getPeliculaDetalle(id),
      this.peliculasService.getCast(id)
    ]).subscribe(([pelicula, cast]) => {
      if (!pelicula) {
        this.router.navigate(['/home']);
        return;
      }

      this.pelicula = pelicula;
      this.cast = cast.filter(person => person.profile_path !== null);
    });
  }

  onRegresar() {
    this.location.back();
  }

}
