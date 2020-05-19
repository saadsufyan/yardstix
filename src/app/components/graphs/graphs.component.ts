import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit, QueryList } from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss'],
})
export class GraphsComponent implements OnInit, AfterViewInit {

  @Input() value;
  // @ViewChild('barChart', {static: false}) barChart: QueryList<ElementRef>;
  @ViewChild('barChart', {static: false}) barChart: ElementRef;

  bars: any;
  colorArray: any;
  loading = false;
  constructor() { }

  ngOnInit() {
    // this.createBarChart();
  }
  ngAfterViewInit() {
    this.createBarChart();
  }
  createBarChart() {

    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        datasets: [{
            label: 'Rating 1 - 10',
            data: this.value,
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
