import { Component,OnInit, ViewChild } from '@angular/core';
import {Router } from '@angular/router';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexAnnotations,
} from 'ng-apexcharts';

import { series } from '../service/data';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  annotations: ApexAnnotations;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  labels: string[];
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{
  @ViewChild('chart')
  chart!: ChartComponent; 
  public chartOptions!: Partial<ChartOptions>| any;
  currentUser: string = '';
 
  constructor(private router: Router) {
    this.chartOptions = {
      series: [
        {
          name: 'image_url',
          data: series.monthDataSeries1.prices,
        },
        {
          name: 'secondary_heading',
          data: series.monthDataSeries2.prices,
        },
      ],
      chart: {
        type: 'bar',
      },
      annotations: {
        points: [
          {
            x: new Date('14 Nov 2017').getTime(),
            y: 8900,
            marker: {
              size: 6,
              fillColor: '#fff',
              strokeColor: 'red',
              radius: 2,
            },
            label: {
              text: 'Data feature',
              borderColor: '#FF4560',
              offsetY: 0,
              style: {
                color: '#fff',
                background: '#FF4560',
              },
            },
          },
        ],
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
        width: 3,
      },
      grid: {
        padding: {
          right: 30,
          left: 20,
        },
      },
      title: {
        text: 'Notification anomalies',
        align: 'left',
      },
      labels: series.monthDataSeries1.dates,
      xaxis: {
        type: 'datetime',
      },
    };
  }
 
  logout() {
    // remove user from local storage to loggout
    localStorage.removeItem('currentUser');
    this.currentUser = '';
    this.router.navigate(['/']);
}
}

