import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApisService } from '../services/apis.service';
import { AlertView } from 'src/uicomponents/alert';

@Component({
  selector: 'app-sharing',
  templateUrl: './sharing.page.html',
  styleUrls: ['./sharing.page.scss'],
  providers: [ApisService]
})
export class SharingPage implements OnInit {

  emails = ['saadsufyan19@gmail.com', 'testing@gmail.com'];
  errorMessage;

  constructor(
    public alertController: AlertController,
    public router: Router,
    public api: ApisService,
    public popup: AlertView,
    public modalController: ModalController) { }

  ngOnInit() {
  }
  public onAdd(email) {
    console.log('email is ' + email);
  }

  sendFeedbackRequest() {
    this.popup.showLoader();
    const data = {
      email: this.emails,
      base_url: 'https://feedbackapp-84297.web.app/home/'
    };
    this.api.feedbackRequest(data).subscribe(res => {
      // console.log(res);
      this.popup.hideLoader();
      this.popup.showToast(res.message, 2000, 'bottom');
      this.presentAlert();
    }, err => {
      console.log(err);
      this.popup.hideLoader();
      this.errorMessage = err.error;
      console.log(this.errorMessage);
      this.errorMessage = this.errorMessage.message;
      this.popup.showToast(this.errorMessage, 1700, 'bottom');
    });
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Feedback',
      subHeader: 'sent',
      message: 'The feedback request has been sent to the given emails',
      // buttons: ['OK']
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['dashboard']);
            this.modalController.dismiss({
              dismissed: true
            });
          }
        }
      ]
    });

    await alert.present();
  }
}
