import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ClientInterface } from '../../store/task/client.interface';
import { Store } from '@ngrx/store';
import { addModeClientAction, deleteClientAction, editModeClientAction, getAllClientsAction, getTypesOfClients, openTaskFormClientAction, setSelectedClientAction } from '../../store/task/client.actions';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';

export interface PeriodicElement {
  _id: string;
  task_name: string;
  description: string;
  created: Date;
  status: string;
}

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss']
})

export class ClientInfoComponent implements OnInit, AfterViewInit {
  @Input() clients: Observable<ClientInterface[]>;
  displayedColumns: string[] = ['_id', 'task_name', 'description', 'created', 'status', 'option_edit', 'option_delete' ];
  dataSource;
  subscription: Subscription;
  temp: Date;

  constructor(private store: Store, private router: Router) {
    this.temp = new Date();
   }

  ngOnInit(): void {
    this.subscription = this.clients.subscribe(allClients =>{
      this.dataSource = new MatTableDataSource(allClients);
    })
  }

  
  ngAfterViewInit(): void {
    this.subscription = this.clients.subscribe(allClients =>{
      this.dataSource = new MatTableDataSource(allClients);
    })
  }

  ngOnDestroy(): void{
    if (this.subscription){
      this.subscription.unsubscribe()
    }
  }

  deleteClient(_id: string): void {
    console.log("delete", _id)
    this.store.dispatch(deleteClientAction({ _id }));
    this.store.dispatch(getAllClientsAction());
    setTimeout(() => {
      this.store.dispatch(getTypesOfClients());
    }, 100);
  }

  editClient(client: ClientInterface) {
    this.store.dispatch(setSelectedClientAction({ client: client }));
    console.log("client", client)
    this.store.dispatch(openTaskFormClientAction());
    this.store.dispatch(editModeClientAction());
    
  }
}
