import { Component, OnInit } from '@angular/core';
import { StockageServiceService } from '../stockage-service.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MatButtonModule,MatCardModule,MatChipsModule,MatTooltipModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {

  namesList = new Array<String>
  actionsList = new Array<String>
  gameList: any = []

  constructor(public stockageService: StockageServiceService){
    this.stockageService.namesObservable.subscribe((namesList)=>{
      this.namesList = namesList
    })

    this.stockageService.actionsObservable.subscribe((actionsList)=>{
      this.actionsList = actionsList
    })
  }

  runGame () {
    if(this.namesList.length == this.actionsList.length){
      this.gameList = []
      const tempNameArray = Object.assign([], this.namesList);
      const tempActionArray = Object.assign([], this.actionsList);

    this.namesList.forEach( name => {
      const player = name
      let target = name 
      let action:String = ''
      let randomNameIndex = 0
      let randomActionIndex = 0

      while(target === name){
        randomNameIndex = Math.floor(Math.random() * (tempNameArray.length) + 0);
        target = tempNameArray[randomNameIndex]
        randomActionIndex = Math.floor(Math.random() * (tempActionArray.length) + 0);
        action = tempActionArray[randomActionIndex]
      }
      tempNameArray.splice(randomNameIndex,1)
      tempActionArray.splice(randomActionIndex,1)

      this.gameList.push({
        player: player,
        target: target,
        action: action
      })
    })
    }
  }
}
