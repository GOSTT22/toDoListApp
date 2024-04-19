import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent implements OnInit {
  formLogin: FormGroup;
  error: string | null;

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
  }

  ngOnInit(): void {
  }

  submitLogin() {
    if (!this.formLogin.valid) {
      return this.error="Fill out the form correctly"
    }
    console.log(this.formLogin.value);
  }

  submitRegister() {
    if (this.formRegister.valid) {
      
    }
  }

  
}
