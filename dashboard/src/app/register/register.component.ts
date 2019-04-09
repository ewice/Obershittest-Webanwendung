import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService, AuthService } from '../../_services/index';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  registerForm: any;
  fb = new FormBuilder;
  lockedIn = false;
  signupForm: FormGroup;
  constructor(private _http: HttpService) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
        ]
      ],
      'password': ['', [

        Validators.minLength(5),
        Validators.maxLength(25),
        Validators.required
        ]
      ],
      'name': ['', [

        Validators.minLength(5),
        Validators.maxLength(25),
        Validators.required
        ]
      ]
    });

  }

  register() {
    this._http.registerNewUser( this.email.value, this.password.value, this.name.value);
  }

  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get name() { return this.signupForm.get('name'); }


}
