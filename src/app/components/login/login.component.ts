import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;

  constructor(private authService: AuthService) {
    this.myForm = new FormGroup({
      user: new FormControl(),
      pass: new FormControl()
    });
  }

  ngOnInit() {
  }

  onLogin() {
    console.log(this.myForm.value);
    this.authService.doLogin(this.myForm.value);
  }

}
