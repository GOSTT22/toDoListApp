import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/hero.reducers';
import { CreateHeroEffect } from './store/hero.effect';
import { HerosService } from './store/heros.service';
import { HttpClientModule } from '@angular/common/http';
import { HeroInfoComponent } from './hero-info/hero-info.component';
import { AddEditHeroComponent } from './add-edit-hero/add-edit-hero.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeroInfoComponent,
    AddEditHeroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    StoreModule.forFeature('hero', reducers),
    EffectsModule.forFeature([CreateHeroEffect])
  ],
  providers: [HerosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
