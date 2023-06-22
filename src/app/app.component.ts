import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { createHeroAction, getAllHerosAction, getTypesOfHeros, setSelectedHeroAction } from './store/hero.actions';
import { ErrorSelector, allHerosSelector, allTypesSelector } from './store/hero.selector';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { HeroInterface } from './store/hero.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  hero: HeroInterface = {
    id: 158,
    name: "Oleh",
    localized_name: "Kovtun",
    type: "Wizard"
  }

  selectedType$: BehaviorSubject<string> = new BehaviorSubject('');

  types$ = this.store.select(allTypesSelector).pipe(
    tap(types => {
      if (types) {
        this.selectedType$.next(types[0])
      }
    })
  );
  heros$ = combineLatest([this.selectedType$, this.store.select(allHerosSelector)]).pipe(
    // filter(heros => !!heros),
    map(([type, heros]) => {
      return heros? heros.filter(hero => hero.type === type) : []
    })
  );
  error$ = this.store.select(ErrorSelector);

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.store.dispatch(getAllHerosAction());
    setTimeout(() => { this.store.dispatch(getTypesOfHeros()); }, 100)
  }

  selectedValue(type: string): void {
    this.selectedType$.next(type);
  }

  createHero(): void {
    const initialHero: HeroInterface = {
      id: 0,
      name: "",
      localized_name: "",
      type: ""
    };
    this.store.dispatch(setSelectedHeroAction({ hero: initialHero }));
    this.router.navigate(['add-edit-hero']);
  }

}
