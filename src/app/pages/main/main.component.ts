import { Component, Input, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import {
  addModeClientAction,
  clearSelectedClientAction,
  closeTaskFormClientAction,
  createClientAction,
  getAllClientsAction,
  getTypesOfClients,
  openTaskFormClientAction,
  setSelectedClientAction,
} from "../../store/task/client.actions";
import {
  ErrorSelector,
  allClientsSelector,
  allTypesSelector,
  isFormOpenedSelecor,
} from "../../store/task/client.selector";
import { map, tap } from "rxjs/operators";
import { BehaviorSubject, Observable, Subscription, combineLatest } from "rxjs";
import { ClientInterface } from "../../store/task/client.interface";
import { Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import { ThemePalette } from "@angular/material/core";
import {
  ProgressSpinnerMode,
  MatProgressSpinnerModule,
} from "@angular/material/progress-spinner";
import { selectAuthError, selectProfile } from "src/app/store/auth/auth.selector";
import { getMeInfoAction } from "src/app/store/auth/auth.actions";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit {
  colorControl = new FormControl("primary" as ThemePalette);
  @Input() clients: Observable<ClientInterface[]>;
  title = "app";
  subscription: Subscription;
  subscriptionProfile: Subscription;
  profile: any

  // Example

  client: ClientInterface = {
    _id: "11",
    task_name: "Buldog",
    description: "basketball team",
    status: "Todo",
  };
  selectedType$: BehaviorSubject<string> = new BehaviorSubject("");

  types$ = this.store.select(allTypesSelector).pipe(
    tap((types) => {
      if (types) {
        this.selectedType$.next(types[0]);
      }
    })
  );

  clients$ = combineLatest([
    this.selectedType$,
    this.store.select(allClientsSelector),
  ]).pipe(
    map(([type, clients]) => {
      return clients ? clients.filter((client) => client.status === type) : [];
    }),
    tap((r) => console.log(r))
  );

  error$ = this.store.select(ErrorSelector);

  isFormOpened$ = this.store.select(isFormOpenedSelecor);

  profile$: Observable<any | null> = this.store.select(selectProfile)

  isFormOpened: boolean;

  constructor(private store: Store, private router: Router) {
   
  }
  

  ngOnInit(): void {
    this.store.dispatch(getAllClientsAction());
    setTimeout(() => {
      this.store.dispatch(getTypesOfClients());
    }, 100);

    this.subscription = this.isFormOpened$.subscribe((data) => {
      // Ваши действия с данными
      this.isFormOpened = data;
    });
    // this.store.dispatch(getMeInfoAction())
    setTimeout(() => {this.store.dispatch(getMeInfoAction());},2000)
    this.store.pipe(select(selectProfile)).subscribe((profile) => {
      // Обработка изменений профиля пользователя
      this.profile = profile;
      console.log('Profile changed:', profile);
    });
    const isToken: boolean = !!localStorage.getItem('token')
    if (!isToken){this.router.navigate(['/auth'])}
  }



  ngOnDestroy(): void {
    // Отписываемся от потока данных при уничтожении компонента
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  selectedValue(type: string): void {
    this.selectedType$.next(type);
  }

  toggle: boolean;
  createClient(): void {
    this.store.dispatch(
      this.isFormOpened
        ? closeTaskFormClientAction()
        : openTaskFormClientAction()
    );
    this.store.dispatch(addModeClientAction());

    const initialClient: ClientInterface = {
      _id: "0",
      task_name: "",
      description: "",
      status: "",
    };
    this.store.dispatch(setSelectedClientAction({ client: initialClient }));
  }

  logOutClient():void {
    localStorage.clear()
    location.reload()
  }
}
