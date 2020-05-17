import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { AlertView } from 'src/uicomponents/alert';
import { ApisService } from '../services/apis.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit, AfterViewInit {

  @ViewChild('barChart', {static: false}) barChart: ElementRef;

  bars: any;
  colorArray: any;

  resultsArray = [];
  emails = ['saadsufyan19@gmail.com', 'testing@gmail.com'];
  errorMessage;
  constructor(
    public modalController: ModalController,
    public popup: AlertView,
    public api: ApisService) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.resultsArray = this.api.fetchData();
    console.log(this.resultsArray);
    this.createBarChart();
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

  createBarChart() {

    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        datasets: [{
            label: 'Rating 0 - 10',
            data: this.resultsArray[0],
            // data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
            // backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
            borderWidth: 1
          }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}

