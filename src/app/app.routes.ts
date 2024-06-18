import { Routes } from '@angular/router';
import { AddNameComponent } from './add-name/add-name.component';
import { AddActionComponent } from './add-action/add-action.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'add-name', component: AddNameComponent },
    { path: 'add-action', component: AddActionComponent },
];
