import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, QueryList } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SharingPage } from '../sharing/sharing.page';
import { LoginPage } from '../login/login.page';
import { AlertView } from 'src/uicomponents/alert';
import { ApisService } from '../services/apis.service';
@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit, AfterViewInit {


  results;
  emails = ['saadsufyan19@gmail.com', 'testing@gmail.com'];
  errorMessage;
  constructor(
    public modalController: ModalController,
    public popup: AlertView,
    public api: ApisService) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.results = this.api.fetchData();
    console.log(this.results);
  }
  onAdd(email) {
    console.log('email is ' + email);
  }
  getResults() {
    this.api.getResultsChart('w9ipozkzxn').subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
      this.popup.hideLoader();
      this.errorMessage = err.error;
      console.log(this.errorMessage);
      this.errorMessage = this.errorMessage.message;
      this.popup.showToast(this.errorMessage, 1700, 'bottom');
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: LoginPage
    });
    return await modal.present();
  }
}
