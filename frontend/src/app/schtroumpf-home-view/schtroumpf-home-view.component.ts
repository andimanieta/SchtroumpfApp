import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schtroumpf-home-view',
  templateUrl: './schtroumpf-home-view.component.html',
  styleUrls: ['./schtroumpf-home-view.component.scss']
})
export class SchtroumpfHomeViewComponent implements OnInit {

  public name: string = "Milou";
  public food: string = "mange tout";
  public family: string = "Truc bizarre";
  public age: number = 5;
  public numbers: number[];
  public urlimage: string = "https://material.angular.io/assets/img/examples/shiba1.jpg";

  constructor() {
    this.numbers = Array(10).fill(1).map((x,i)=>i);
  }

  ngOnInit(): void {
  }

}
