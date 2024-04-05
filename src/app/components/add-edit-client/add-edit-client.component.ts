import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { clearSelectedClientAction, createClientAction, setSelectedClientAction, updateClientAction } from '../../store/client.actions';
import { selectSelectedClientSelector } from '../../store/client.selector';
import { ClientInterface } from '../../store/client.interface';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-client',
  templateUrl: './add-edit-client.component.html',
  styleUrls: ['./add-edit-client.component.scss']
})
export class AddEditClientComponent implements OnInit {
  
  _id: string;
  isInputDisabled = false;

  idControl = new FormControl('');
  task_nameControl = new FormControl('');
  descriptionControl = new FormControl('');
  statusControl = new FormControl('');
  form = new FormGroup({});

  create = false;
  
  client: ClientInterface;
  client$ = this.store.select(selectSelectedClientSelector).pipe(
    tap(client => {
      if (client) {
        this.client = client;
        this._id = this.client._id;
        if (this._id === "0") {
          this.create = true;
        }
        this.idControl = new FormControl(this.client._id);
        this.task_nameControl = new FormControl(this.client.task_name);
        this.descriptionControl = new FormControl(this.client.description);
        this.statusControl = new FormControl(this.client.status);

        this.form = new FormGroup({
          _id: this.idControl,
          task_name: this.task_nameControl,
          description: this.descriptionControl,
          status: this.statusControl
        })
      }
    })
  );

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
  }

  submit(): void {
    if (this.create) {
      this.store.dispatch(createClientAction({ client: this.form.value }))
    } else {
      const newId = this.idControl.value;
      let obj: ClientInterface = this.form.value;
      if (this._id !== newId) {
        obj._id = this._id;
        window.alert("You can't change ID.")
      }
      this.store.dispatch(updateClientAction({ client: obj}));
    }
    this.store.dispatch(clearSelectedClientAction());
    this.router.navigate(['/']);
  }

  cancel(){
    const initialClient: ClientInterface = {
      _id: "0",
      task_name: "",
      description: "",
      status: ""
    };
    this.store.dispatch(setSelectedClientAction({ client: initialClient }));

    // this.router.navigate(['']);
    // this.store.dispatch(clearSelectedClientAction());
  }
  toggle: boolean;
  closed(): void {
    this.toggle = false;
    this.router.navigate(['']);
    // const initialClient: ClientInterface = {
    //   _id: "0",
    //   task_name: "",
    //   description: "",
    //   status: ""
    // };
    // this.store.dispatch(setSelectedClientAction({ client: initialClient }));
    // this.router.navigate(['add-edit-client']);
    // if (!this.toggle) {
    //   this.router.navigate(['']);
      // this.store.dispatch(clearSelectedClientAction());
    // }
  }

}
