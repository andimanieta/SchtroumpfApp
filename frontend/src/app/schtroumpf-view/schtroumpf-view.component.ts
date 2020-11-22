import {Component, Inject, OnInit} from '@angular/core';
import {Schtroumpf} from "../Models/Schtroumpf.model";
import {FormBuilder} from "@angular/forms";
import {SchtroumpfService} from "../Services/schtroumpf.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-schtroumpf-view',
  templateUrl: './schtroumpf-view.component.html',
  styleUrls: ['./schtroumpf-view.component.scss']
})
export class SchtroumpfViewComponent implements OnInit {

  schtroumpf: Schtroumpf;

  constructor(private formBuilder: FormBuilder,
              private schtroumpfService: SchtroumpfService,
              public dialogRef: MatDialogRef<SchtroumpfViewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {

  }

  closeDialog() {
    this.dialogRef.close();
  }
}
