import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAllHerosAction, getTypesOfHeros } from './store/hero.actions';
import { ErrorSelector, allHerosSelector, allTypesSelector } from './store/hero.selector';
import { filter, map, tap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

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

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(getAllHerosAction());
    setTimeout(() => { this.store.dispatch(getTypesOfHeros()); }, 100)
  }

  selectedValue(type: string): void {
    this.selectedType$.next(type);
  }

}
