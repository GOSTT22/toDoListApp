import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditClientComponent } from './add-edit-client/add-edit-client.component';


const routes: Routes = [
  {
    path: 'add-edit-client',
    component: AddEditClientComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
