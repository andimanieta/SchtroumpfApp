import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Schtroumpf} from "../Models/Schtroumpf.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SchtroumpfService} from "../Services/schtroumpf.service";

@Component({
  selector: 'app-schtroumpf-edit',
  templateUrl: './schtroumpf-edit.component.html',
  styleUrls: ['./schtroumpf-edit.component.scss']
})
export class SchtroumpfEditComponent implements OnInit {
  post: string = '';
  titleAlert: string;
  formGroup: FormGroup;

  schtroumpf: Schtroumpf;/*{
    _id: 'ifdsqdf',
    name: 'sassette',
    age: 25,
    family: 'Schtroumpf',
    food: 'Mange n\'importe quoi',
    picture: 'https://banner2.cleanpng.com/20190623/vvk/kisspng-sassette-handy-smurf-the-smurflings-wiki-the-smurf-sassette-smurfling-glovey-story-smurfs-fanon-wik-5d1028219584c2.2997718615613399376124.jpg',
    friends: []
  };*/

  constructor(private formBuilder: FormBuilder,
              private schtroumpfService: SchtroumpfService,
              public dialogRef: MatDialogRef<SchtroumpfEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.createForm();
    this.setChangeValidate();
    this.schtroumpf = this.schtroumpfService.schtroumpf;
    this.schtroumpfService.emitSchtroumpf();
  }

  createForm() {
    this.schtroumpf = this.schtroumpfService.schtroumpf;
    this.formGroup = this.formBuilder.group({
      'name': [this.schtroumpf.name, Validators.required],
      'age': [this.schtroumpf.age, [Validators.required, this.checkAge]],
      'family': [this.schtroumpf.family, Validators.required],
      'food': [this.schtroumpf.food, Validators.required],
      'picture': [this.schtroumpf.picture, Validators.required],
      'validate': ''
    });
  }

  setChangeValidate() {
    this.formGroup.get('validate').valueChanges.subscribe(
      (validate) => {
        if (validate == '1') {
          this.formGroup.get('name').setValidators([Validators.required, Validators.minLength(3)]);
          this.titleAlert = "You need to specify at least 3 characters";
        } else {
          this.formGroup.get('name').setValidators(Validators.required);
        }
        this.formGroup.get('name').updateValueAndValidity();
      }
    )
  }

  get name() {
    return this.formGroup.get('name') as FormControl
  }

  onSave(form: FormGroup) {
    this.schtroumpfService.schtroumpf.name = form.get('name').value;
    this.schtroumpfService.schtroumpf.age = form.get('age').value;
    this.schtroumpfService.schtroumpf.family = form.get('family').value;
    this.schtroumpfService.schtroumpf.food = form.get('food').value;
    this.schtroumpfService.emitSchtroumpf();
    this.closeDialog()
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getErrorAge(){
    return this.formGroup.get('age').hasError('requirements') ? 'Enter a valid age !' :
      this.formGroup.get('age').hasError('ageMax') ? 'The maximum age is 100 years old !' : '';
  }

  checkAge(control) {
    let enteredAge = control.value
    let ageCheck = /^[0-9]*$/;
    let age : number = enteredAge;
    if(age > 100) {
      return  {'ageMax': true};
    }
    return (!ageCheck.test(enteredAge) && enteredAge) ? {'requirements': true}: null;
  }

}
