import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';

import { AppComponent }  from './app.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroesComponent }  from './heroes.component';
import { HeroesService }  from './hero.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    DashboardComponent.forRoot([
      {
        path:'',
        redirectTo:'/dashboard',
        pathMatch: 'full'
      },
    ])
    RouterModule.forRoot([
      {
        path: 'heroes',
        component: HeroesComponent
      }
    ])
  ],
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroesComponent,
    DashboardComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
