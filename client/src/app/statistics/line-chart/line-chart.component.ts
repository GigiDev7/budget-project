import { Component, ElementRef, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { StatisticsService } from '../services/statistics.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  public chart: any;
  private monthLabels =
    this.statisticsService.data &&
    this.statisticsService.data.stats.map((item) => item.month);

  private incomeData =
    this.statisticsService.data &&
    this.statisticsService.data.stats.map((item) => item.sumIncomes);
  private expanseData =
    this.statisticsService.data &&
    this.statisticsService.data.stats.map((item) => item.sumExpanses);
  private economyData =
    this.statisticsService.data &&
    this.statisticsService.data.stats.map((item) => item.economy);

  private config: any = {
    type: 'line',
    data: {
      labels: this.monthLabels,
      datasets: [
        {
          label: 'Income',
          data: this.incomeData,
          fill: false,
          borderColor: 'rgb(51, 255, 51)',
          tension: 0.1,
        },
        {
          label: 'Expanse',
          data: this.expanseData,
          fill: false,
          borderColor: 'rgb(255, 51, 51)',
          tension: 0.1,
        },
        {
          label: 'Economy',
          data: this.economyData,
          fill: false,
          borderColor: 'rgb(51, 51, 255)',
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  private chartit(): void {
    let htmlRef = this.elementRef.nativeElement.querySelector(`#myChart`);
    this.chart = new Chart(htmlRef, this.config);
  }

  constructor(
    private elementRef: ElementRef,
    private statisticsService: StatisticsService
  ) {}

  public ngOnInit(): void {
    this.chartit();
  }
}
