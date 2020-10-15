import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'movieAng';

  aPage = false;

  mPage = false;

  aToggle = false;

  mToggle = false;



  actorPage(){
    this.aPage = !this.aPage;
    this.aToggle = !this.aToggle;

  }

  moviePage(){
    this.mPage = !this.mPage;
    this.mToggle = !this.mToggle;

  }

}
