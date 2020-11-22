import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../Services/auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  formGroup: FormGroup;
  errorMessage: string;
  post: any = '';
  titleAlert: string;
  serverErreur: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private auth: AuthService) {
  }

  ngOnInit() {
    this.createForm();
    this.setChangeValidate();
  }


  createForm() {
    this.formGroup = this.formBuilder.group({
      'name': [null, Validators.required],
      'age': [null, [Validators.required, this.checkAge]],
      'family': [null, Validators.required],
      'food': [null, Validators.required],
      'picture': [null, Validators.required],
      'password': [null, [Validators.required, this.checkPassword]],
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

  onSignup() {
    const name = this.formGroup.get('name').value;
    const age = this.formGroup.get('age').value;
    const family = this.formGroup.get('family').value;
    const food = this.formGroup.get('food').value;
    const picture = this.formGroup.get('picture').value;
    const password = this.formGroup.get('password').value;
    this.auth.createNewUser(name, age, family, food, picture, password).then(
      () => this.router.navigate(['home']))
      .catch(error => this.errorMessage = error.message);
  }



  checkInSchtroumpfName(control)
  {
    let db = ['access to database'];
    return new Observable(observer => {
      setTimeout(() => {
        let result = (db.indexOf(control.value) !== -1) ? {'alreadyInUse': true} : null;
        observer.next(result);
        observer.complete();
      }, 4000)
    })
  }

  get name() {
    return this.formGroup.get('name') as FormControl
  }

  getErrorPassword()
  {
    return this.formGroup.get('password').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
      this.formGroup.get('password').hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
  }

  checkPassword(control) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? {'requirements': true} : null;
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
