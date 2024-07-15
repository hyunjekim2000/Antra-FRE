import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavBarComponent } from './pages/home/components/nav-bar/nav-bar.component';
import { TvComponent } from './pages/home/components/tv/tv.component';
import { DownloadComponent } from './pages/home/components/download/download.component';
import { PlatformsComponent } from './pages/home/components/platforms/platforms.component';
import { KidsComponent } from './pages/home/components/kids/kids.component';
import { FaqComponent } from './pages/home/components/faq/faq.component';
import { FooterComponent } from './pages/home/components/footer/footer.component';
import { LoginComponent } from './pages/login/login/login.component';
import { SignupStep1Component } from './pages/signup-step1/signup-step1.component';
import { SignupStep2Component } from './pages/signup-step2/signup-step2.component';
import { MovieItemComponent } from './pages/movie/movie-item/movie-item.component';
import { MovieListComponent } from './pages/movie/movie-list/movie-list.component';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { MovieDetailsComponent } from './pages/movie/movie-details/movie-details.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { SafePipe } from './pages/movie/safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    TvComponent,
    DownloadComponent,
    PlatformsComponent,
    KidsComponent,
    FaqComponent,
    FooterComponent,
    LoginComponent,
    SignupStep1Component,
    SignupStep2Component,
    MovieItemComponent,
    MovieListComponent,
    MovieDetailsComponent,
    SafePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    InfiniteScrollDirective,
    YouTubePlayerModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
