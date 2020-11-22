import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {Schtroumpf} from "../Models/Schtroumpf.model";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class SchtroumpfService {

  schtroumpf: Schtroumpf = {
    _id: this.authService.userId,
    name: this.authService.schtroumpfName,
    age: this.authService.schtroumpfAge,
    family: this.authService.schtroumpfFamily,
    food: this.authService.schtroumpfFood,
    picture: this.authService.schtroumpfPicture,
    friends: this.authService.schtroumpfFriends
  };

  schtroumpfFriends: Schtroumpf[];

  allSchtroumpf: Schtroumpf[];

  schtroumpf$ = new Subject<Schtroumpf>();
  schtroumpfFriends$ = new Subject<Schtroumpf[]>();
  allSchtroumpf$ = new Subject<Schtroumpf[]>();

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  getAllSchtroumpfs() {
    this.http.get('http://localhost:3000/api/allSchtroumpf').subscribe(
      (schtroumpfs: Schtroumpf[]) => {
        if (schtroumpfs) {
          this.allSchtroumpf = schtroumpfs;
          this.emitAllSchtroumpf();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  emitAllSchtroumpf() {
    this.allSchtroumpf$.next(this.allSchtroumpf);
  }

  getschtroumpfFriends() {
    this.http.get('http://localhost:3000/api/schtroumpfFriends').subscribe(
      (schtroumpf: Schtroumpf[]) => {
        if (schtroumpf) {
          this.schtroumpfFriends = schtroumpf;
          this.emitSchtroumpfFriends();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  emitSchtroumpfFriends() {
    this.schtroumpfFriends$.next(this.schtroumpfFriends);
  }


  getSchtroumpf() {
    this.http.get('http://localhost:3000/api/schtroumpf').subscribe(
      (schtroumpf: Schtroumpf) => {
        if (schtroumpf) {
          this.schtroumpf = schtroumpf;
          this.emitSchtroumpf();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  emitSchtroumpf() {
    this.schtroumpf$.next(this.schtroumpf);
  }

  updateSchtroumpf() {
    this.emitSchtroumpf();
  }

  getSchtroumpfById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/schtroumpf' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  createNewSchtroumpf(Schtroumpf: Schtroumpf) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/schtroumpf', Schtroumpf).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }


  modifySchtroumpf(id: string, schtroumpf: Schtroumpf) {
    return new Promise((resolve, reject) => {
      this.http.put('http://localhost:3000/api/schtroumpf', schtroumpf).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  deleteSchtroumpf(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/api/schtroumpf/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  removeFriend(obj: Schtroumpf) {
    const index: number = this.schtroumpfFriends.indexOf(obj);
    if (index !== -1)
      this.schtroumpfFriends.splice(index, 1);
    this.emitSchtroumpfFriends()
    this.emitAllSchtroumpf()
  }

  addFriend(obj: Schtroumpf) {
    const index = this.schtroumpfFriends.filter(
      f => f._id == obj._id &&
       f.name == obj.name);

    if (index.length === 0)
      this.schtroumpfFriends.push(obj);

    this.emitSchtroumpfFriends()
    this.emitAllSchtroumpf()
  }


}
