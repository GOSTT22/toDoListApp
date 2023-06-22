import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditHeroComponent } from './add-edit-hero/add-edit-hero.component';


const routes: Routes = [
  {
    path: 'add-edit-hero',
    component: AddEditHeroComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
