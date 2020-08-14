import {Component, OnInit} from '@angular/core';
import {AuthService} from "../_service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  constructor(
    private _authService:AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    this._authService.logout()
      .subscribe(() => {
        this.router.navigateByUrl('/');
      });
  }

  toUrl(element){
    this.router.navigateByUrl( element.currentTarget.value);
  }
}
