import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit, AfterViewInit {

  @ViewChild('lineChart', {static: false}) lineChart: ElementRef;
  bars: any;
  colorArray: any;
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.createBarChart();
  }
  createBarChart() {
    this.bars = new Chart(this.lineChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['4/15/2020', '4/16/2020', '4/17/2020', '4/18/2020', '4/19/2020', '4/20/2020', '4/21/2020', '4/22/2020'],
        datasets: [{
          label: 'Rating 0 - 100',
          data: [25, 38, 50, 69, 69, 75, 30, 95],
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
