import { Injectable, Component } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ToastController
} from '@ionic/angular';

@Injectable()
export class AlertView {
  public enTitle: string;
  public enMessage: string;
  public enButtons: any;
  public loading: any;
  public toastMessage: string;
  public toastDuration: number;
  public toastPosition: string;
  public toastShowCloseButton: boolean;
  public toastCloseButtonText: string;
  public isLoading = false;

  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {}

  showAlert(title: any, message: string, buttonsText: string[]) {
    this.enTitle = title;
    this.enMessage = message;
    this.enButtons = buttonsText;
    const alert = this.alertCtrl.create({
      header: this.enTitle,
      subHeader: this.enMessage,
      buttons: this.enButtons
    });

    alert.then((myAlert: any) => {
      myAlert.present();
    });
  }

  async showLoader() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      message: 'Loading. Please Wait...',
      duration: 90000,
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss().then(() => {});
        }
      });
    });
  }

  async hideLoader() {
    this.isLoading = false;
    return await this.loadingCtrl
      .dismiss()
      .then(() => {});
  }

  showToast(
    message: string,
    duration: number,
    position: string,
    // showclosebutton: boolean,
    // text: string
  ) {
    this.toastMessage = message;
    this.toastDuration = duration;
    this.toastPosition = position;
    // this.toastShowCloseButton = showclosebutton;
    // this.toastCloseButtonText = text;
    const toast = this.toastCtrl.create({
      message: this.toastMessage,
      duration: this.toastDuration,
      position: 'bottom',
    });

    toast.then((myToast: any) => {
      myToast.present();
    });
    // toast.present();
  }
}
