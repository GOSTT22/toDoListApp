import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { tap } from "rxjs/operators";
import { createLoginDataAction, createRegisterDataAction } from "src/app/store/auth/auth.actions";
import { LoginInterface, RegisterInterface } from "src/app/store/auth/auth.interface";
import { selectAuthError, selectAuthToken } from "src/app/store/auth/auth.selector";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent implements OnInit {
  formLogin: FormGroup;
  error: string | null;
  error$: BehaviorSubject<string> = new BehaviorSubject("");
  selectedError$: Observable<string | null>;
  selectedTabIndex: number = 0;
  formRegister: FormGroup;
  subscription: Subscription;

  token$ = this.store.select(selectAuthToken);

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.formLogin = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(4)]],
      password: ["", [Validators.required, Validators.minLength(8)]],
    });
    this.formRegister = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(4)]],
      email: ["", [Validators.required, Validators.minLength(14)]],
      firstname: ["", [Validators.required, Validators.minLength(4)]],
      lastname: ["", [Validators.required, Validators.minLength(4)]],
      password: ["", [Validators.required, Validators.minLength(8)]],
    });

    this.subscription = this.token$.subscribe((data) => {
      if (data !== null && data !== undefined) {
        // Выполняем навигацию только если данные изменились
        this.router.navigate(['/main']);
      }
    });
    
    this.selectedError$ = this.store.select(selectAuthError);
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    // Не забудьте отписаться от подписки при уничтожении компонента
    this.subscription.unsubscribe();
  }

  submitLogin() {
    this.error = null;
    if (!this.formLogin.valid) {
      return this.error="Fill out the form correctly"
    }
    console.log(this.formLogin.value);
    let obj: LoginInterface = {...this.formLogin.value}
    console.log("OGJECT", obj)
    this.store.dispatch(createLoginDataAction({ login: obj }));
    this.formLogin.reset()
  }

  submitRegister() {
    this.error = null;
    if (!this.formRegister.valid) {
      return this.error="Fill out the form correctly"
    }
    console.log(this.formRegister.value);
    let obj: RegisterInterface = {...this.formRegister.value}
    console.log("OGJECT", obj)
    this.store.dispatch(createRegisterDataAction({ register: obj }));
    this.selectedTabIndex = 0;
    this.formRegister.reset()
  }
}
