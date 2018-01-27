import { Component, OnInit } from '@angular/core';
import { BookdetailsService } from './bookdetails.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
	selector: 'app-bookdetails',
	templateUrl: './bookdetails.component.html',
	styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit {
	bookDetails: any;
	bookId: any;
	constructor( 
		private bookDetailsService: BookdetailsService,
		private route: ActivatedRoute,
		private router: Router,
		private _cookieService:CookieService) { }

	ngOnInit() {
		if(this._cookieService.get('user')){
			this.route.params.subscribe(params => {
				// route info is stored in `params`
				this.bookId = params.id;
			});
			this.getDetails();
		}
		else{
			this.router.navigate(['signin']);	
		}
		
	}

	getDetails(){
		this.bookDetailsService.getBookDetails(this.bookId)
		.subscribe(
			bookDetails => {
				this.bookDetails = bookDetails;				
			},
			error => {
				console.log(error);
			}
			)
	}

	logout(){
		//can call server sdie logout api		
		localStorage.removeItem('q');
		this._cookieService.removeAll();
		this.router.navigate(['signin']);
	}

}
