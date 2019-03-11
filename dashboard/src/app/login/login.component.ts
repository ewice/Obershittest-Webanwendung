import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpService} from '../../app/_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  registerForm: any;
  fb = new FormBuilder;
  lockedIn = false;
  signupForm: FormGroup;
  constructor(private _http: HttpService, private router: Router) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      'email': ['info@dhbw.mosbach.de', [
        Validators.required,
        Validators.email
        ]
      ],
      'password': ['mosbach', [

        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.required
        ]
      ]
    });
  }

  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }

  login() {
    this._http.sendEmailandPassword(this.email.value, this.password.value);
  }

}
