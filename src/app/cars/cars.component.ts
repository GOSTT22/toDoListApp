import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarsService } from './services/cars.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit, OnDestroy {

  allCars$ = this.carsService.getAllCars();
  updateSubscription: Subscription;


  constructor(private carsService: CarsService, private router: Router) { }

  ngOnInit(): void {
    this.carsService.getWasUpdated().subscribe((value) => {
      console.log(value);
      if(value) {
        this.allCars$ = this.carsService.getAllCars();
        this.carsService.setWasUpdated(false);
      }
    });
  }

  ngOnDestroy(): void {
    if(this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  goNew(): void {
    this.router.navigate(['cars/car-detail', 0])
  }

  deleteCar(id: number): void {
    this.carsService.deleteCar(id).pipe(take(1)).subscribe();
    this.allCars$ = this.carsService.getAllCars();
  }

  editCar(id: number): void {
    this.router.navigate(['cars/car-detail', id]);
  }

}
