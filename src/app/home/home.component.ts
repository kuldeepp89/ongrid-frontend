import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import * as _ from "lodash";
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
	bookmarks: any [];
	userId: string;
	bookmarkedImage: string = "../assets/bookm.png";
	bookmarkImage: string = "../assets/book.png";
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
				this.userId = this.user.split("_id")[1].split(",")[0].split(":")[1].split('"')[1]
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
					localStorage.setItem('q', this.searchQuery);
					this.bookList = books;
					let that = this;
					let index = -1;
					_.each(this.bookList.items, function(currentBook){
						index = _.findIndex(JSON.parse(localStorage.getItem(that.userId)), function(bookId){							
							return currentBook.id == bookId;

						})
						if(index > -1){
							currentBook.isBookmarked = true;
						}	
					})
				},
				error => {
					console.log(error);
				}
				)
		}

		getDetails(bookId: string){
			this.router.navigate(['book/'+bookId]);			
		}

		toggleBookmark(isBookmarked: boolean, bookId: string, bookIndex: number){
			
			this.bookmarks = JSON.parse(localStorage.getItem(this.userId)) || [];
			if(!isBookmarked){
				this.bookmarks.push(bookId);
				this.bookmarks = _.uniq(this.bookmarks);
				localStorage.setItem(this.userId, JSON.stringify(this.bookmarks));
				this.bookList.items[bookIndex].isBookmarked = true;				
			}
			else{
				this.bookmarks = _.pull(this.bookmarks, bookId);	
				this.bookList.items[bookIndex].isBookmarked = false;			
				localStorage.setItem(this.userId, JSON.stringify(this.bookmarks));
			}

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
