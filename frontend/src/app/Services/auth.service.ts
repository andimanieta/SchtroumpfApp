import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Schtroumpf} from "../Models/Schtroumpf.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth$ = new BehaviorSubject<boolean>(false);
  token: string;
  userId: string;
  schtroumpfName: string;
  schtroumpfAge: number;
  schtroumpfFamily: string;
  schtroumpfFood: string;
  schtroumpfPicture: string;
  schtroumpfFriends: Schtroumpf[];

  constructor(private router: Router,
              private http: HttpClient) {
  }

  createNewUser(name: string,
                age: number,
                family: string,
                food: string,
                picture: string,
                password: string) {
    return new Promise((resolve, reject) => {
      this.http.post(
        'http://localhost:3000/api/signup',
        {name: name,
          age: age,
          family: family,
          food: food,
          picture: picture,
          password: password
        })
        .subscribe(
          () => {
            this.signIn(name, password).then(
              () => {
                resolve();
              }
            ).catch(
              (error) => {
                reject(error);
              }
            );
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  signIn(name: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post(
        'http://localhost:3000/api/login',
        {name: name, password: password})
        .subscribe(
          (authData: { token: string,
            userId: string,
            userName: string,
            userAge: number,
            userFamily: string,
            userFood: string,
            userPicture: string,
            userFriends: Schtroumpf[]}) => {
            this.token = authData.token;
            this.userId = authData.userId;
            this.schtroumpfName = authData.userName;
            this.schtroumpfAge = authData.userAge;
            this.schtroumpfFamily = authData.userFamily;
            this.schtroumpfFood = authData.userFood;
            this.schtroumpfPicture = authData.userPicture;
            this.schtroumpfFriends = authData.userFriends;
            this.isAuth$.next(true);
            console.log(this.userId);
            console.log(this.token);
            console.log(this.schtroumpfName)
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  logout() {
    this.isAuth$.next(false);
    this.userId = null;
    this.token = null;
  }
}
