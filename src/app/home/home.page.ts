import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public alertController: AlertController, public router: Router) {}
  async onReject() {
    const alert = await this.alertController.create({
      header: 'Feedback',
      subHeader: 'Rejected',
      message: 'Thank you, your rejection will not be shared with the sender, would you like to create your own survey ?',
      // buttons: ['OK']
      buttons: [
        {
          text: 'NO',
          handler: () => {
            // this.router.navigate(['results']);
            console.log('close popup');
          }
        },
        {
          text: 'YES',
          handler: () => {
            this.router.navigate(['sharing']);
          }
        }
      ]
    });

    await alert.present();
  }
}
