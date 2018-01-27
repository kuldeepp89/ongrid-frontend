import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule,HashLocationStrategy, LocationStrategy} from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HomeService } from './home/home.service';

import { AppRoutingModule } from './app.routing';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth/auth.service';

import { Routes, RouterModule } from '@angular/router';
import { BookdetailsComponent } from './bookdetails/bookdetails.component';
import { BookdetailsService } from './bookdetails/bookdetails.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';



const routes = [
	  { path: '',  redirectTo: 'signin', pathMatch: 'full'},
    { path: 'signin', component: AuthComponent},
  	{ path: 'home', component: HomeComponent },
  	{ path: 'book/:id', component: BookdetailsComponent },
    { path: '**', redirectTo: '',  pathMatch: 'full' }
  	
];

@NgModule({
  declarations: [
    AppComponent,    
    HomeComponent, AuthComponent, BookdetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [{
           	provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
    HomeService,
    BookdetailsService,
    AuthService,
    CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
