import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { TvComponent } from './components/tv/tv.component';
import { DownloadComponent } from './components/download/download.component';
import { PlatformsComponent } from './components/platforms/platforms.component';
import { KidsComponent } from './components/kids/kids.component';
import { FaqComponent } from './components/faq/faq.component';

const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [
    HomeComponent,
    TvComponent,
    DownloadComponent,
    PlatformsComponent,
    KidsComponent,
    FaqComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule {
  constructor() {
    console.log('HomeModule loaded');
  }
}
