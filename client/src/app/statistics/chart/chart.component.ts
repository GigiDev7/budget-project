import { Component, ElementRef, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { StatisticsService } from '../services/statistics.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  public chart: any;
  private categoryLabels: string[] | null =
    this.statisticsService.categoryData &&
    this.statisticsService.categoryData.stats.map((item) => item.category);
  private categoryAmounts: number[] | null =
    this.statisticsService.categoryData &&
    this.statisticsService.categoryData.stats.map((item) => item.sum);
  private data = {
    labels: this.categoryLabels,
    datasets: [
      {
        label: 'Category Statistics',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: this.categoryAmounts,
      },
    ],
  };
  config: any = {
    type: 'bar',
    data: this.data,
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
