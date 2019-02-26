import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email] ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      retypepassword: ['', [Validators.required]]
     });

  }

  doSignup(){
    console.log('signup....');
  }

  /*validatePasswords(control:FormControl): { [s:string]:boolean } {
    console.log(control);
    if(control.value !== this.signupForm.controls['password'].value){
      return { 'noMatch': true };
    }
    return null;
  }*/

}
