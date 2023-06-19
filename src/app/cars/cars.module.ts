import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsComponent } from './cars.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { CarsService } from './services/cars.service';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: '',
        component: CarsComponent,
        children: [
            {
                path: 'car-detail/:id',
                component: CarDetailComponent
            }
        ]
    }
]

@NgModule({
  declarations: [
    CarsComponent,
    CarDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  providers: [CarsService, HttpClient]
})
export class CarsModule { }