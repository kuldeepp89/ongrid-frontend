import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private _cookieService:CookieService) { }

	ngOnInit() {
		if(this._cookieService.get('user')){
			this.router.navigate(['home']);
		}
	}

}
