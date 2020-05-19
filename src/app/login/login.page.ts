import { Component, OnInit } from '@angular/core';
import { AlertView } from 'src/uicomponents/alert';
import { ApisService } from '../services/apis.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email;
  password;
  errorMessage;
  constructor(
    public popup: AlertView,
    public router: Router,
    public api: ApisService) { }

  ngOnInit() {
  }
  userLogin() {
    if (this.email && this.password) {
      this.popup.showLoader();
      const data = {
        email: this.email,
        password: this.password
      };
      this.api.login(data).subscribe(
        (res: any) => {
          // console.log(res);
          this.popup.hideLoader();

          localStorage.setItem('token', res.access_key);
          localStorage.setItem('user', JSON.stringify(res.user));
          localStorage.setItem('isLoggedIn', 'true');
          this.popup.showToast(res.message, 2000, 'bottom');
          this.router.navigateByUrl('dashboard');
        },
        err => {
          console.log(err);
          this.popup.hideLoader();
          this.errorMessage = err.error;
          console.log(this.errorMessage);
          this.errorMessage = this.errorMessage.message;
          this.popup.showToast(this.errorMessage, 2000, 'bottom');
        }
      );
    } else {
      this.popup.showToast('Invalid information', 2000, 'bottom');
    }
  }
}
