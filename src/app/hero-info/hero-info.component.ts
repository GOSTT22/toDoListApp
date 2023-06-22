import { Component, Input, OnInit } from '@angular/core';
import { HeroInterface } from '../store/hero.interface';
import { Store } from '@ngrx/store';
import { deleteHeroAction, setSelectedHeroAction } from '../store/hero.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-info',
  templateUrl: './hero-info.component.html',
  styleUrls: ['./hero-info.component.scss']
})
export class HeroInfoComponent implements OnInit {

  @Input() hero: HeroInterface;
  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
  }

  deleteHero(id: number): void {
    this.store.dispatch(deleteHeroAction({ id }));
  }

  editHero(hero: HeroInterface) {
    this.store.dispatch(setSelectedHeroAction({ hero: hero }));
    this.router.navigate(['add-edit-hero']);
  }
}
