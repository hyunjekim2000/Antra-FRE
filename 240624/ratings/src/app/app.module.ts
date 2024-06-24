import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RatingIndivComponent } from './rating-indiv/rating-indiv.component';
import { RatingAvgComponent } from './rating-avg/rating-avg.component';
import { RatingListComponent } from './rating-list/rating-list.component';

@NgModule({
  declarations: [
    AppComponent,
    RatingIndivComponent,
    RatingAvgComponent,
    RatingListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
