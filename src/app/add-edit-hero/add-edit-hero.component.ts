import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { clearSelectedHeroAction, createHeroAction, updateHeroAction } from '../store/hero.actions';
import { selectSelectedHeroSelector } from '../store/hero.selector';
import { HeroInterface } from '../store/hero.interface';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-hero',
  templateUrl: './add-edit-hero.component.html',
  styleUrls: ['./add-edit-hero.component.scss']
})
export class AddEditHeroComponent implements OnInit {

  id: number;

  idControl = new FormControl('');
  nameControl = new FormControl('');
  localized_nameControl = new FormControl('');
  typeControl = new FormControl('');
  form = new FormGroup({});

  create = false;
  
  hero: HeroInterface;
  hero$ = this.store.select(selectSelectedHeroSelector).pipe(
    tap(hero => {
      if (hero) {
        this.hero = hero;
        this.id = this.hero.id;
        if (this.id === 0) {
          this.create = true;
        }
        this.idControl = new FormControl(this.hero.id);
        this.nameControl = new FormControl(this.hero.name);
        this.localized_nameControl = new FormControl(this.hero.localized_name);
        this.typeControl = new FormControl(this.hero.type);

        this.form = new FormGroup({
          id: this.idControl,
          name: this.nameControl,
          localized_name: this.localized_nameControl,
          type: this.typeControl
        })
      }
    })
  );

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
  }

  submit(): void {
    if (this.create) {
      this.store.dispatch(createHeroAction({ hero: this.form.value }))
    } else {
      const newId = this.form.value.id;
      let obj: HeroInterface = this.form.value;
      if (this.id !== newId) {
        obj.id = this.id;
        window.alert("You can't change ID.")
      }
      this.store.dispatch(updateHeroAction({ hero: obj}));
    }
    this.store.dispatch(clearSelectedHeroAction());
    this.router.navigate(['/']);
  }

}
