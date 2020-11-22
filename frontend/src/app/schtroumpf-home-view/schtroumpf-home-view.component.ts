import {Component, OnDestroy, OnInit} from '@angular/core';
import {SchtroumpfEditComponent} from "../schtroumpf-edit/schtroumpf-edit.component";
import {Schtroumpf} from "../Models/Schtroumpf.model";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Subject, Subscription} from "rxjs";
import {SchtroumpfService} from "../Services/schtroumpf.service";
import {SchtroumpfViewComponent} from "../schtroumpf-view/schtroumpf-view.component";
import {AuthService} from "../Services/auth.service";

@Component({
  selector: 'app-schtroumpf-home-view',
  templateUrl: './schtroumpf-home-view.component.html',
  styleUrls: ['./schtroumpf-home-view.component.scss']
})
export class SchtroumpfHomeViewComponent implements OnInit, OnDestroy {

  schtroumpf: Schtroumpf;
  schtroumpfSub: Subscription;
  allSchtroumpf: Schtroumpf[];
  allSchtroumpfSub: Subscription;
  schtroumpfFriends: Schtroumpf[];
  schtroumpfFriendsSub: Subscription;

  numbers: number[];
  schtroumpfs: Schtroumpf[];

  constructor(private router: Router,
              private schtroumpfService: SchtroumpfService,
              private authService: AuthService,
              private route: ActivatedRoute,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.schtroumpf = {
      _id: this.authService.userId,
      name: this.authService.schtroumpfName,
      age: this.authService.schtroumpfAge,
      family: this.authService.schtroumpfFamily,
      food: this.authService.schtroumpfFood,
      picture: this.authService.schtroumpfPicture,
      friends: this.authService.schtroumpfFriends
    }

    /*this.schtroumpfSub = this.schtroumpfService.schtroumpf$.subscribe(
      (schtroumpf) => {
        this.schtroumpf = schtroumpf;
      }
    );
    this.schtroumpfService.getSchtroumpf();*/

    /*this.schtroumpfFriendsSub = this.schtroumpfService.schtroumpfFriends$.subscribe(
      (schtroumpf) => {
        this.schtroumpfFriends = schtroumpf;
      }
    );
    this.schtroumpfService.getschtroumpfFriends();

    this.allSchtroumpfSub = this.schtroumpfService.allSchtroumpf$.subscribe(
      (schtroumpfs) => {
        this.allSchtroumpf = schtroumpfs;
      }
    );
    this.schtroumpfService.getAllSchtroumpfs();*/
  }


  onEdit() {
    let dialogRef = this.dialog.open(SchtroumpfEditComponent,
      {
        data: {
          name: this.schtroumpf.name,
          age: this.schtroumpf.age,
          family: this.schtroumpf.family,
          food: this.schtroumpf.food,
          picture: this.schtroumpf.picture,
          friends: this.schtroumpf.friends
        }
      });
    this.schtroumpfService.emitSchtroumpf();
  }

  OnView(obj: Schtroumpf) {
    let dialogRef = this.dialog.open(SchtroumpfViewComponent,
      {
        data: {
          name: obj.name,
          age: obj.age,
          family: obj.family,
          food: obj.food,
          picture: obj.picture,
          friends: obj.friends
        }
      });
    this.schtroumpfService.emitSchtroumpf();
  }

  onRemoveFriend(friend: Schtroumpf) {
    this.schtroumpfService.removeFriend(friend);
  }

  onAddFriend(newFriend: Schtroumpf) {
    this.schtroumpfService.addFriend(newFriend);
  }

  ngOnDestroy() {
    //this.schtroumpfSub.unsubscribe();
    //this.schtroumpfFriendsSub.unsubscribe();
    //this.allSchtroumpfSub.unsubscribe();
  }

}
