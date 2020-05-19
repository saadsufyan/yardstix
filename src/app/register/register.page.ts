import { Component, OnInit } from '@angular/core';
import { AlertView } from 'src/uicomponents/alert';
import { ApisService } from '../services/apis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name;
  email;
  password;
  errorMessage;
  constructor(
    public popup: AlertView,
    public router: Router,
    public api: ApisService) { }

  ngOnInit() {
  }
  signupUser() {
    if (
      this.name &&
      this.email &&
      this.password
    ) {
      this.popup.showLoader();

      const data = {
        name: this.name,
        email: this.email,
        password: this.password
      };

      this.api.register(data).subscribe(
        (res: any) => {
          // console.log(res);
          this.popup.hideLoader();
          localStorage.setItem('token', res.access_key);
          localStorage.setItem('user', JSON.stringify(res.user));
          localStorage.setItem('isLoggedIn', 'true');
          this.popup.showToast(res.message, 2000, 'bottom');
          this.router.navigateByUrl('login');
        },
        err => {
          console.log(err);
          this.popup.hideLoader();
          this.errorMessage = err.error;
          console.log(this.errorMessage);
          this.errorMessage = this.errorMessage.message;
          this.popup.showToast(this.errorMessage, 1700, 'bottom');
        }
      );
    } else {
      this.popup.showToast('Please fill all required fields', 2000, 'bottom');
    }
  }
}
