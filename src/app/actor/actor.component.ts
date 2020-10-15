import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";
import { MovieComponent } from "../movie/movie.component";


@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {

  actorsDB: any[] = [];
  moviesDB: any[] = [];
  section = 1;

  movie: MovieComponent;

  

  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";

  addActorID: string = "";

  constructor(private dbService: DatabaseService) { }

  // Get all Actors
  onGetActors(){
    this.dbService.getActors().subscribe((data: any[]) =>{
      this.actorsDB = data;
    })
  }

  //Create a new Actor, POST request
  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }
  // Update an Actor
  onSelectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }
  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }
  //Delete Actor
  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }



  ngOnInit(): void {
    this.onGetActors();
    this.onGetMovies();
    this.section = this.dbService.getActorSection();
  }

  changeSection(sectionId){
    this.section = sectionId;
    this.dbService.updateActorSection(sectionId);
  }

  resetValues() {
    this.fullName = "";
    this.bYear = 0;
    this.actorId = "";
  }

  onAddActorToMovie(item) {
    this.dbService.addActorToMovie({id: this.addActorID}, item).subscribe(result => {
      this.onGetMovies();
      this.movie.onGetMovies();
    });
  }

  //Select actor to add to a movie
  onSelectActorToAdd(item) {
    this.addActorID = item;
    this.changeSection(6);
    
  }

  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }

}
