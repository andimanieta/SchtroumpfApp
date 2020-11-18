import {Component, OnInit} from '@angular/core';
import {AuthService} from "../Services/auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit {
  app_title: string = "Schtroumpf App";
  isAuthSub: Subscription;
  isAuth: boolean;

  constructor(private auth: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.isAuthSub = this.auth.isAuth$.subscribe(
      (auth) => {
        this.isAuth = auth;
      }
    );
  }

  onLogout() {
    this.auth.logout();
    this.router.navigate(['/auth/signin']);
  }

  ngOnDestroy() {
    this.isAuthSub.unsubscribe();
  }

}
