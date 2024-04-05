import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { clearSelectedClientAction, createClientAction, getAllClientsAction, getTypesOfClients, setSelectedClientAction } from './store/client.actions';
import { ErrorSelector, allClientsSelector, allTypesSelector } from './store/client.selector';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { ClientInterface } from './store/client.interface';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
  }
}
