import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MovieProvider
  ]
})
export class FeedPage {

  // public objeto_feed = {
  //   titulo:"David Sampaio",
  //   data:"23 de outubro de 2017",
  //   descricao:"Descrição do card que eu estou preenchendo",
  //   qtd_like:12,
  //   qtd_comentario: 5,
  //   time_comentario:"11h atrás"
  // }

  public lista_filmes = new Array<any>();
  public nomeUsuario:string = "David Sampaio";
  
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private movieProvider: MovieProvider
    ) {
  }

  // public somaDoisNumeros():void{
  //   //alert("3");
  // }

  ionViewDidLoad() {
    this.movieProvider.getPopularMovies().subscribe(
      data =>{
        const json_retorno = JSON.parse((data as any)._body);
        this.lista_filmes = json_retorno.results;
        console.log(json_retorno);
      },
      error =>{
        console.log("David: " + error)
      }
    );
  }

}
