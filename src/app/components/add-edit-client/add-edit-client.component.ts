import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import {
  clearSelectedClientAction,
  closeTaskFormClientAction,
  createClientAction,
  setSelectedClientAction,
  updateClientAction,
} from "../../store/client.actions";
import { selectSelectedClientSelector } from "../../store/client.selector";
import { ClientInterface } from "../../store/client.interface";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-add-edit-client",
  templateUrl: "./add-edit-client.component.html",
  styleUrls: ["./add-edit-client.component.scss"],
})
export class AddEditClientComponent implements OnInit {
  subscription: Subscription;
  form: FormGroup;

  _id: string;
  isInputDisabled = false;

  // form = new FormGroup({
  //   idControl: new FormControl(""),
  //   task_nameControl: new FormControl("", [Validators.minLength(4)]),
  //   descriptionControl: new FormControl("", [Validators.minLength(4)]),
  //   statusControl: new FormControl("Todo"),
  // });

  create = false;

  client: ClientInterface;
  client$ = this.store.select(selectSelectedClientSelector).pipe(
    tap((client) => {
      // console.log("Come", client)
      if (client) {
        this.client = client;
        this._id = this.client._id;
        if (this._id === "0") {
          this.create = true;
        }
        this.form.controls["idControl"].setValue(this.client._id);
        this.form.controls["task_nameControl"].setValue(this.client.task_name);
        this.form.controls["descriptionControl"].setValue(
          this.client.description
        );
        this.form.controls["statusControl"].setValue(this.client.status);

        this.form = new FormGroup({
          _id: this.form.controls["idControl"].value,
          task_name: this.form.controls["task_nameControl"].value,
          description: this.form.controls["descriptionControl"].value,
          status: this.form.controls["statusControl"].value,
        });
      }
    })
  );

  constructor(private fb: FormBuilder, private store: Store, private router: Router) {
    this.form = this.fb.group({
      task_nameControl: ['', [Validators.required, Validators.minLength(4)]],
      descriptionControl: ['', [Validators.required, Validators.minLength(4)]],
      statusControl: ['Todo', Validators.required]
    });
  }

  ngOnInit(): void {
    this.subscription = this.client$.subscribe((client) => {
      // Ваши действия с данными
      this.form.controls["task_nameControl"].setValue(client.task_name);
        this.form.controls["descriptionControl"].setValue(client.description);
        this.form.controls["statusControl"].setValue(client.status);
    });
  }

  submit(): void {
    this.form.markAllAsTouched()
    if (this.form.valid) return alert("fill out the form correctly")
      
    // console.log("GO", this.task_nameControl.valid, this.task_nameControl.value);

    if (this.create) {
      this.store.dispatch(createClientAction({ client: this.form.value }));
    } else {
      const newId = this.form.controls["idControl"].value;
      let obj: ClientInterface = this.form.value;
      if (this._id !== newId) {
        obj._id = this._id;
        window.alert("You can't change ID.");
      }
      this.store.dispatch(updateClientAction({ client: obj }));
    }
    this.store.dispatch(clearSelectedClientAction());
    this.router.navigate(["/"]);
  }

  cancel() {
    const initialClient: ClientInterface = {
      _id: "0",
      task_name: "",
      description: "",
      status: "",
    };
    this.store.dispatch(setSelectedClientAction({ client: initialClient }));
  }
  toggle: boolean;
  closed(): void {
    // this.toggle = false;
    this.store.dispatch(closeTaskFormClientAction());
    // }
  }
}
