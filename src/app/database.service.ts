import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  result: any;

  actorSection = 1;

  movieSection = 1;

  updateActorSection(section){
    this.actorSection = section;

  }

  getActorSection(){
    return this.actorSection;
  }

  updateMovieSection(section){
    this.movieSection = section;

  }

  getMovieSection(){
    return this.movieSection;
  }

  getActors(){
    return this.http.get("/actors");
  }

  deleteMovieByYear(year){
    let url = "/movies/byYear/" + year;
    return this.http.delete(url, httpOptions);
  }

  getActor(id: string){
    let url = "/actors" + id;
    return this.http.get(url);
  }

  createActor(data){
    return this.http.post("/actors", data, httpOptions);
  }

  updateActor(id, data){
    let url = "/actors/" + id;
    return this.http.put(url, data, httpOptions);
  }

  deleteActor(id){
    console.log(id);
    let url = "/actors/" + id;
    return this.http.delete(url, httpOptions);
    
  }

  getMovies(){
    return this.http.get("/movies");
  }

  deleteMovie(id){
    console.log(id);
    let url = "/movies/" + id;
    return this.http.delete(url, httpOptions);
    
  }

  createMovie(data){
    return this.http.post("/movies", data, httpOptions);
  }

  updateMovie(id, data){
    let url = "/movies/" + id;
    return this.http.put(url, data, httpOptions);
  }

  addActorToMovie(actor, movie) {
    let url = '/movies/' + movie._id + '/actors';
    return this.http.post(url, actor, httpOptions);
  }  




}
