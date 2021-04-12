import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from 'src/app/interfaces/cartelera-response';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  public textoBuscado: string;
  public movies: Movie[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private peliculasService: PeliculasService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params.texto && params.texto != null) {
        this.textoBuscado = params.texto;
        this.buscarPeliculas(params.texto);
      }
    })
  }

  buscarPeliculas(texto: string) {
    this.peliculasService.buscarPeliculas(texto).subscribe(
      response => {
        this.movies = response;
      }
    );
  }

}
