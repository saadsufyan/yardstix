import { Component, OnInit, AfterViewInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { AlertView } from 'src/uicomponents/alert';
import { ApisService } from '../services/apis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit, AfterViewInit {

  resultsArray = [];
  headingArray = [
    'Presentable',
    'Excellence',
    'Achieves Deadlines',
    'Inspirational',
    'Effective',
    'Collaborative',
    'Knowledgable',
    'Strategy',
    'Communication',
    'Values People',
    'Progressive',
    'Leadership'
  ];
  emails = ['saadsufyan19@gmail.com', 'testing@gmail.com'];
  errorMessage;
  public isEmpty = true;
  uniqueString: string;
  constructor(
    public router: Router,
    public popup: AlertView,
    public api: ApisService) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.resultsArray = this.api.fetchData();
    this.isEmpty = false;
    if (this.resultsArray === undefined) {
      this.isEmpty = true;
      this.getResults();
    }
  }
  onAdd(email) {
    console.log('email is ' + email);
  }
  getResults() {
    this.popup.showLoader();
    this.uniqueString = localStorage.getItem('referral');
    this.api.getResultsChart(this.uniqueString).subscribe(res => {
      // console.log(res);
      this.popup.hideLoader();
      if (res.data) {
        this.isEmpty = false;
        this.resultsArray = res.data;
      }
    }, err => {
      console.log(err);
      this.popup.hideLoader();
      this.errorMessage = err.error;
      console.log(this.errorMessage);
      this.errorMessage = this.errorMessage.message;
      this.popup.showToast(this.errorMessage, 1700, 'bottom');
    });
  }

  goToNextPage() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['sharing']);
    } else {
      this.router.navigate(['register']);
    }
  }
}

