import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ClientInterface } from '../store/client.interface';
import { Store } from '@ngrx/store';
import { deleteClientAction, setSelectedClientAction } from '../store/client.actions';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';

export interface PeriodicElement {
  id: number;
  task_name: string;
  status: string;
}

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss']
})




export class ClientInfoComponent implements OnInit, AfterViewInit {
  @Input() clients: Observable<ClientInterface[]>;
  displayedColumns: string[] = ['id', 'task_name', 'status', 'option_edit', 'option_delete' ];
  dataSource;
  subscription: Subscription;

  constructor(private store: Store, private router: Router) { }

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

  deleteClient(id: number): void {
    this.store.dispatch(deleteClientAction({ id }));
  }

  editClient(client: ClientInterface) {
    this.store.dispatch(setSelectedClientAction({ client: client }));
    this.router.navigate(['add-edit-client']);
  }
}
