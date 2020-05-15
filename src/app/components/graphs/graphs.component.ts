import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit, QueryList } from '@angular/core';
import { Chart } from 'chart.js';
import { ModalController } from '@ionic/angular';
import { AlertView } from 'src/uicomponents/alert';
import { ApisService } from '../../services/apis.service';
@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss'],
  providers: [
    ApisService
  ]
})
export class GraphsComponent implements OnInit {

  @Input() value;
  @ViewChild('barChart', {static: false}) barChart: QueryList<ElementRef>;
  bars: any;
  colorArray: any;
  results;
  errorMessage;
  constructor(
    public modalController: ModalController,
    public popup: AlertView,
    public api: ApisService) { }

  ngOnInit() {}
  createBarChart() {

    this.bars = new Chart(this.barChart.toArray()
    .filter(r => r.nativeElement.hasAttribute('foo')), {
      type: 'bar',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        datasets: [{
          label: 'Rating 0 - 10',
          data: this.value,
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
