import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider {

  private BASIC_API_PATH = "https://api.themoviedb.org/3";
  private API_KEY="ede3afd03e553bb7232a1363571a6613";

  constructor(public http: Http) {
    // console.log('Hello MovieProvider Provider');
  }

  getLatestMovies(){
    return this.http.get(this.BASIC_API_PATH + "/movie/latest?api_key=" + this.API_KEY);
  }

  getPopularMovies(){
    console.log("Serviço: " + this.BASIC_API_PATH + "/movie/popular?api_key=" + this.API_KEY + "&language=pt-BR");
    return this.http.get(this.BASIC_API_PATH + "/movie/popular?api_key=" + this.API_KEY + "&language=pt-BR");
  }

}
