import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-sharing',
  templateUrl: './sharing.page.html',
  styleUrls: ['./sharing.page.scss'],
})
export class SharingPage implements OnInit {

  emails = ['saadsufyan19@gmail.com', 'testing@gmail.com'];

  constructor(
    public alertController: AlertController,
    public router: Router,
    public modalController: ModalController) { }

  ngOnInit() {
  }
  public onAdd(email) {
    console.log('email is ' + email);
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
            // this.router.navigate(['results']);
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
