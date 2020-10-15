import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  moviesDB: any[] = [];

  section = 1;

  title: string = "";

  year: number = 0;

  movieId: string = "";

  yearBtn = false;

  filterYear: number = 0;

  constructor(private dbService: DatabaseService) { }

  // Get all Actors
  onGetMovies(){
    this.dbService.getMovies().subscribe((data: any[]) =>{
      this.moviesDB = data;
    })
  }

  onSetFilter(){
    console.log(this.filterYear);
    return this.filterYear;
    
  }


  

  //Create a new Actor, POST request
  onSaveMovie() {
    let obj = { title: this.title, year: this.year };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    });
  }
  // Update an Actor
  onSelectUpdate(item) {
    this.title = item.title;
    this.year = item.year;
    this.movieId = item._id;
  }
  onUpdateMovie() {
    let obj = { title: this.title, year: this.year };
    this.dbService.updateMovie(this.movieId, obj).subscribe(result => {
      this.onGetMovies();
    });
  }
  //Delete Actor
  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
    });
  }

  onDeleteMovieByYear(){
    console.log(this.filterYear);
    this.dbService.deleteMovieByYear(this.filterYear).subscribe(result =>{
      this.onGetMovies();
    });
  }



  ngOnInit(): void {
    this.onGetMovies();
    this.section = this.dbService.getMovieSection();
  }

  changeSection(sectionId){
    this.section = sectionId;
    this.toggleYearBtn();
    this.dbService.updateMovieSection(sectionId);
  }

  onYearBtn(){
    this.changeSection(5);
    this.yearBtn = true;
  }

  toggleYearBtn(){
    if (this.yearBtn){
      this.yearBtn = false;
    }
  }

  resetValues() {
    this.title = "";
    this.year = 0;
    this.movieId = "";
  }

}
