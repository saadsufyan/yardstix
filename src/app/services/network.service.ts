import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class NetworkService {
  public iosClientKey = '';
  public androidClientKey = '';
  public device;
  public authorizationkey;

  constructor(public http: HttpClient, public platform: Platform) {
    if (this.platform.is('ios')) {
      this.device = 'ios';
      this.authorizationkey = this.iosClientKey;
    } else {
      this.device = 'android';
      this.authorizationkey = this.androidClientKey;
    }
  }

  getMultiPartHeaders() {
    const token = localStorage.getItem('token');
    const header = {
      'x-access-token': token,
    };
    const headers = new HttpHeaders(header);
    return headers;
  }

  getHeaders() {
    const userIsLoggedIn = localStorage.getItem('isLoggedIn');
    const token = localStorage.getItem('token');
    if (userIsLoggedIn === 'true') {
      return this.getAuthHeaders(token);
    } else if (userIsLoggedIn === 'false') {
      return this.getClientHeaders();
    } else {
      return this.getClientHeaders();
    }
  }

  getClientHeaders() {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return headers;
  }

  getAuthHeaders(token) {
    const header = {
      'Content-Type': 'application/json',
      'x-access-token': token,
    };
    const headers = new HttpHeaders(header);
    return headers;
  }
}
