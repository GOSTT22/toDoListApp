import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditClientComponent } from './components/add-edit-client/add-edit-client.component';
import { MainComponent } from './pages/main/main.component';
import { AuthComponent } from './pages/auth/auth.component';
import { P404Component } from './page/p404/p404.component';


const routes: Routes = [
  {
    path: 'add-edit-client',
    component: AddEditClientComponent
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'p404',
    component: P404Component
  },
  {path:'', redirectTo: 'main', pathMatch: 'full'},
  {path:'**', redirectTo: 'p404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
