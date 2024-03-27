import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { clearSelectedClientAction, createClientAction, updateClientAction } from '../store/client.actions';
import { selectSelectedClientSelector } from '../store/client.selector';
import { ClientInterface } from '../store/client.interface';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-client',
  templateUrl: './add-edit-client.component.html',
  styleUrls: ['./add-edit-client.component.scss']
})
export class AddEditClientComponent implements OnInit {
  
  _id: string;

  idControl = new FormControl('');
  task_nameControl = new FormControl('');
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
        this.statusControl = new FormControl(this.client.status);

        this.form = new FormGroup({
          _id: this.idControl,
          task_name: this.task_nameControl,
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
      const newId = this.form.value._id;
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

}
