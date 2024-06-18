import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StockageServiceService } from '../stockage-service.service';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-action',
  standalone: true,
  imports: [ReactiveFormsModule,MatFormFieldModule, MatInputModule, MatButtonModule,MatListModule,MatIconModule],
  templateUrl: './add-action.component.html',
  styleUrl: './add-action.component.css'
})
export class AddActionComponent {

  action = new FormControl('');
  actionsList = new Array<String>

  constructor(private stockageService: StockageServiceService) {
    this.stockageService.actionsObservable.subscribe((actionsList)=>{
      this.actionsList = actionsList
    })
 }

 addAction() {
  this.stockageService.addActionToActionsList(this?.action?.value?this?.action?.value:'')
  this.action.reset()
}

deleteAction(index: number) {
  this.stockageService.deleteActionFormActionsList(index)
}

}
