import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { createLoginDataAction, createRegisterDataAction } from "src/app/store/auth/auth.actions";
import { LoginInterface, RegisterInterface } from "src/app/store/auth/auth.interface";
import { selectAuthError } from "src/app/store/auth/auth.selector";

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

  formRegister: FormGroup = new FormGroup({
    username: new FormControl(""),
    email: new FormControl(""),
    firstname: new FormControl(""),
    lastname: new FormControl(""),
    password: new FormControl(""),
  });

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.formLogin = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(4)]],
      password: ["", [Validators.required, Validators.minLength(8)]],
    });
    this.selectedError$ = this.store.select(selectAuthError);
  }

  ngOnInit(): void {
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
    
  }

  submitRegister() {
    if (!this.formRegister.valid) {
      return this.error="Fill out the form correctly"
    }
    console.log(this.formRegister.value);
    let obj: RegisterInterface = {...this.formRegister.value}
    console.log("OGJECT", obj)
    this.store.dispatch(createRegisterDataAction({ register: obj }));
  }
}
