import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { clearSelectedClientAction, createClientAction, getAllClientsAction, getTypesOfClients, setSelectedClientAction } from './store/client.actions';
import { ErrorSelector, allClientsSelector, allTypesSelector } from './store/client.selector';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { ClientInterface } from './store/client.interface';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  colorControl = new FormControl('primary' as ThemePalette);
  title = 'app';
  // color: ThemePalette = 'primary';
  // mode: ProgressSpinnerMode = 'determinate';
  // value = 50;

  // Example

  client: ClientInterface = {
    _id: "11",
    task_name: "Buldog",
    description: "basketball team",
    status: "Todo"
  }

  selectedType$: BehaviorSubject<string> = new BehaviorSubject('');

  types$ = this.store.select(allTypesSelector).pipe(
    tap(types => {
      if (types) {
        this.selectedType$.next(types[0])
      }
    })
  );
  clients$ = combineLatest([this.selectedType$, this.store.select(allClientsSelector)]).pipe(
    map(([type, clients]) => {
      return clients? clients.filter(client => client.status === type) : []
    }),
    tap(r => console.log(r))
  );
  error$ = this.store.select(ErrorSelector);

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.store.dispatch(getAllClientsAction());
    setTimeout(() => { this.store.dispatch(getTypesOfClients()); }, 100)
  }

  selectedValue(type: string): void {
    this.selectedType$.next(type);
  }

  toggle: boolean;
  createClient(): void {
    this.toggle = !this.toggle;
    const initialClient: ClientInterface = {
      _id: "0",
      task_name: "",
      description: "",
      status: ""
    };
    this.store.dispatch(setSelectedClientAction({ client: initialClient }));
    this.router.navigate(['add-edit-client']);
    if (!this.toggle) {
      this.router.navigate(['']);
      // this.store.dispatch(clearSelectedClientAction());
    }
  }

}
