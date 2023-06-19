import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CarsService } from '../services/cars.service';
import { iCars } from '../services/cars.interface';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss']
})
export class CarDetailComponent implements OnInit {

  idControl = new FormControl("");
  nameControl = new FormControl("");
  numberControl = new FormControl("");
  mileageControl = new FormControl("");

  form = new FormGroup({
    id: this.idControl,
    name: this.nameControl,
    number: this.numberControl,
    mileage: this.mileageControl
  })

  car: iCars;
  id: number;
  isEditing = false;

  constructor(private carsService: CarsService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params["id"];
    if (this.id > 0) {
      this.isEditing = true;
      this.carsService.getCarByID(this.id).pipe(take(1)).subscribe(car => {
        this.car = car;
        console.log(this.car);
        this.idControl.setValue(this.car.id);
        this.nameControl.setValue(this.car.name);
        this.numberControl.setValue(this.car.number);
        this.mileageControl.setValue(this.car.mileage);

        this.form = new FormGroup({
          id: this.idControl,
          name: this.nameControl,
          number: this.numberControl,
          mileage: this.mileageControl
        })
      });
    } 
  }

  onCarSubmit(): void {
    const obj: iCars = {
      ...this.form.value, id: +this.form.value.id
    }
    if(!this.isEditing) {
      this.carsService.createCar(obj).pipe(take(1)).subscribe(() => {
      this.router.navigate(['cars']);
      });
    } else {
      this.carsService.updateCar(obj).pipe(take(1)).subscribe(() => {
      this.router.navigate(['cars']);
      });
    }
    
  }

}
