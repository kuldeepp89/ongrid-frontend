import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	bookList: any = [];
	searchQuery: string;
	bookDetails: any;
	user: any;
	displayName: string;
	constructor(
		private homeService: HomeService,
		private route: ActivatedRoute,
		private router: Router,
		private authService: AuthService,
		private _cookieService:CookieService) { }

		ngOnInit() {			
			if(this._cookieService.get('user')){
				if(localStorage.getItem('q')){
					this.searchQuery = localStorage.getItem('q');
					this.searchBooks();
				}
				this.user = this._cookieService.get('user');
				this.displayName = this.user.split("displayName")[2].split(",")[0].split(":")[1].split('"')[1];

			}
			else{
				this.router.navigate(['signin']);
			}		
		}	

		searchBooks(){
			this.homeService.searchBooks(this.searchQuery)
			.subscribe(
				books => {
					localStorage.setItem('q', this.searchQuery)
					this.bookList = books;				
				},
				error => {
					console.log(error);
				}
				)
		}

		getDetails(bookId: string){
			this.router.navigate(['book/'+bookId]);			
		}

		isLoggedIn(){
			this.authService.isLoggedIn()
			.subscribe(
				user => {									 
					if(user){
						localStorage.setItem('user', user)
						return true;
					}
					else{
						return false;
					}
				},
				error => {
					return false;
				}
				)
		}

		logout(){
			//can call server side logout api
			localStorage.removeItem('q');
			this._cookieService.removeAll();
			this.router.navigate(['signin']);
		}

	}
