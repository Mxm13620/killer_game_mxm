import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StockageServiceService } from '../stockage-service.service';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-add-name',
  standalone: true,
  imports: [ReactiveFormsModule,MatButtonModule, MatFormFieldModule, MatInputModule,MatListModule,MatIconModule],
  templateUrl: './add-name.component.html',
  styleUrl: './add-name.component.css',
})
export class AddNameComponent {
  name = new FormControl('');
  namesList = new Array<String>
  

  constructor(private stockageService: StockageServiceService){
    this.stockageService.namesObservable.subscribe((namesList)=>{
      this.namesList = namesList
    })
  }

  addName() {
    this.stockageService.addNameToNamesList(this?.name?.value?this?.name?.value:'')
    this.name.reset()
  }

  deleteName(index: number) {
    this.stockageService.deleteNameFormNamesList(index)
  }
}
