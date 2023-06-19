import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'cars',
    loadChildren: () => import('./cars/cars.module').then(m => m.CarsModule) 
  },
  {
    path: '',
    redirectTo: 'cars', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
