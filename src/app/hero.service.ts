import { Injectable } from '@angular/core';

import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import { HeroService } from './hero.service';

@Injectable()
export class HeroService {
  getHeroes(): Hero {
    return HEROES
   }
}
