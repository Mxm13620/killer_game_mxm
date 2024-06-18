import { Component, OnInit, inject, model, signal } from '@angular/core';
import { StockageServiceService } from '../stockage-service.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface DialogData {
  player: string;
  target: string;
  action: string;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MatButtonModule,MatCardModule,MatChipsModule,MatTooltipModule,MatFormFieldModule, MatInputModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {

  namesList = new Array<String>
  actionsList = new Array<String>
  gameList: any = []
  invalidSize:boolean = false
  readonly dialog = inject(MatDialog);
  readonly game = signal('');

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
    } else {
      this.invalidSize = true
    }
  }

  openDialog(target: string, action: string, player: string): void {
    const dialogRef = this.dialog.open(GameDialog, {
      data: {target: target, action: action, player: player},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.game.set(result);
      }
    });
  }
}


@Component({
  selector: 'game-dialog',
  templateUrl: 'game-dialog.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class GameDialog {
  readonly dialogRef = inject(MatDialogRef<GameDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly target = model(this.data.target);
  readonly action = model(this.data.action);
  readonly player = model(this.data.player);

  onNoClick(): void {
    this.dialogRef.close();
  }
}