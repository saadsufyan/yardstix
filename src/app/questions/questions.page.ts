import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {

  knobValues = 0;
  knobValues1 = 0;
  constructor(public alertController: AlertController, public router: Router) { }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Feedback',
      subHeader: 'Completed',
      message: 'Thanks for taking time and giving your precious feedback',
      // buttons: ['OK']
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['results']);
          }
        }
      ]
    });

    await alert.present();
  }
}
