import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import {
  clearSelectedClientAction,
  closeTaskFormClientAction,
  createClientAction,
  getAllClientsAction,
  getTypesOfClients,
  setSelectedClientAction,
  updateClientAction,
} from "../../store/client.actions";
import { isEditModeSelecor, selectSelectedClientSelector } from "../../store/client.selector";
import { ClientInterface } from "../../store/client.interface";

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
  create = false;
  client: ClientInterface;

  client$ = this.store.select(selectSelectedClientSelector).pipe(
    tap((client) => {
      if (client) {
        this.client = client;
        this._id = this.client._id;
        if (this._id === "0") {
          this.create = true;
        }
        this.form.patchValue({
          task_name: client.task_name,
          description: client.description,
          status: client.status,
        });
      }
    })
  );

  isEditMode$ = this.store.select(isEditModeSelecor);
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.form = this.fb.group({
      task_name: ["", [Validators.required, Validators.minLength(4)]],
      description: ["", [Validators.required, Validators.minLength(4)]],
      status: ["Todo", Validators.required],
    });
  }

  ngOnInit(): void {
    this.subscription = this.client$.subscribe();
    // this.isEditMode$ = this.store.select(isEditModeSelecor);
    this.subscription = this.isEditMode$.subscribe((data) => {
      // Ваши действия с данными
      this.isEditMode = data;
    });
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (!this.form.valid) return alert("Fill out the form correctly");
    console.log("sss", this.create)
    // const newId = this.form.controls["idControl"].value;

    let obj: ClientInterface = {...this.form.value}
    obj._id= this.client._id
    console.log("OGJECT", obj)
    // if (this._id !== newId) {
    //   obj._id = this._id;
    //   window.alert("You can't change ID.");
    // }
    console.log("error",this.isEditMode )
    this.isEditMode ? this.store.dispatch(updateClientAction({ client: obj })) : this.store.dispatch(createClientAction({ client: obj }));
    this.store.dispatch(clearSelectedClientAction());
    this.store.dispatch(getAllClientsAction());
    setTimeout(() => {
      this.store.dispatch(getTypesOfClients());
    }, 100);
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

  closed(): void {
    this.store.dispatch(closeTaskFormClientAction());
  }
}
