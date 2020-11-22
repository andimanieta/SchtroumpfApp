import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from "@angular/router";


//----components----
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {SignupComponent} from './auth/signup/signup.component';
import {SigninComponent} from './auth/signin/signin.component';
import {SchtroumpfViewComponent} from './schtroumpf-view/schtroumpf-view.component';
import {SchtroumpfListComponent} from './schtroumpf-list/schtroumpf-list.component';
import {SchtroumpfFriendsListComponent} from './schtroumpf-friends-list/schtroumpf-friends-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SchtroumpfEditComponent } from './schtroumpf-edit/schtroumpf-edit.component';

//----services----
import {AuthService} from "./Services/auth.service";
import {AuthGuard} from "./Services/auth-guard.service";
import {SchtroumpfService} from "./Services/schtroumpf.service";
import {AuthInterceptor} from "./interceptor/auth-interceptor";

//----angular materials----
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {SchtroumpfHomeViewComponent} from './schtroumpf-home-view/schtroumpf-home-view.component';
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatCardModule} from "@angular/material/card";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {MatGridListModule} from "@angular/material/grid-list";
import {FooterComponent} from './footer/footer.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import 'hammerjs';



export const routes: Routes = [
  {path: 'home', component: SchtroumpfHomeViewComponent, canActivate: [AuthGuard]},
  {path: 'auth/signin', component: SigninComponent},
  {path: 'auth/signup', component: SignupComponent},
  {path: 'schtroumpfs', component: SchtroumpfListComponent/*, canActivate: [AuthGuard]*/},
  {path: 'schtroumpf_friends/:id', component: SchtroumpfFriendsListComponent/*, canActivate: [AuthGuard]*/},
  {path: 'schtroumpf/:id', component: SchtroumpfViewComponent/*, canActivate: [AuthGuard]*/},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    SchtroumpfViewComponent,
    SchtroumpfListComponent,
    SchtroumpfFriendsListComponent,
    SchtroumpfHomeViewComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    SchtroumpfEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSlideToggleModule,
    HttpClientModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    RouterModule.forRoot(routes),
    MatGridListModule,
    MatCheckboxModule,
    MatInputModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    SchtroumpfService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
