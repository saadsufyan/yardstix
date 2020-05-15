import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertView } from 'src/uicomponents/alert';
import { ApisService } from '../services/apis.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
  providers: [ApisService]
})
export class QuestionsPage implements OnInit {

  questionValue = [];
  questionsList;
  errorMessage;
  constructor(
    public alertController: AlertController,
    public router: Router,
    public popup: AlertView,
    public api: ApisService) { }

  ngOnInit() {
    this.getAllQuestions();
  }

  getAllQuestions() {
    this.popup.showLoader();
    this.api.getQuestion('w9ipozkzxn').subscribe(res => {
      console.log(res);
      this.questionsList = res.questions;
      this.popup.hideLoader();
    }, err => {
      console.log(err);
      this.popup.hideLoader();
      this.errorMessage = err.error;
      console.log(this.errorMessage);
      this.errorMessage = this.errorMessage.message;
      this.popup.showToast(this.errorMessage, 1700, 'bottom');
    });
  }
  submitFeedback() {
    this.popup.showLoader();
    const data = {
      link: 'w9ipozkzxn',
      answers: this.questionValue
    };
    this.api.giveFeedback(data).subscribe(res => {
      console.log(res);
      this.api.send(res);
      this.popup.hideLoader();
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
    console.log(this.questionValue);
    const alert = await this.alertController.create({
      header: 'Feedback',
      subHeader: 'Completed',
      message: 'Thank you for taking time to provide feedback. Please feel free to use our platform to request a peer review for yourself.',
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
