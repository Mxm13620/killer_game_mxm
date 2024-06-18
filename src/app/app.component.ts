import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AddNameComponent } from './add-name/add-name.component';
import { AddActionComponent } from './add-action/add-action.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HomePageComponent,AddNameComponent,AddActionComponent,MatButtonModule,MatCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title='killer game'

  display = ''

  addName() {
    this.display ='name'
  }

  addAction() {
    this.display ='action'
  }

  game() {
    this.display ='game'
  }
}
