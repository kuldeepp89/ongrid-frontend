import { NgModule }	from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
 
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';


const routes: Routes = [
	  { path: '',  redirectTo: 'signin', pathMatch: 'full'},
    { path: 'signin', component: AuthComponent},
  	{ path: 'home', component: HomeComponent },
    { path: '**', redirectTo: '',  pathMatch: 'full' }
  	
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})


export class AppRoutingModule {}

