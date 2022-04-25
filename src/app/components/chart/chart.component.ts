import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';

// const optionsConfig = require("../../config/chart-options.json");
import * as optionsConfig from "../../../config/chart-options.json";
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements AfterViewInit, OnChanges {
  @Input() generalStats: any;

  chart: any;
  data: any;
  options = optionsConfig;


  /**
   * @inheritdoc
   */
  ngOnChanges(): void {
    this.data = {
      labels: this.generalStats?.labels,
      datasets: [
        {
          label: 'Confirmed',
          data: this.generalStats?.confirmedArray,
          backgroundColor: 'rgba(40,125,200,.5)',
          borderColor: 'rgb(40,100,200)',
          fill: true,
          lineTension: 0,
          radius: 5,
        },
        {
          label: 'Critical',
          data: this.generalStats?.criticalArray,
          backgroundColor: 'rgba(75,10,125,.5)',
          borderColor: 'rgb(75,10,125)',
          fill: true,
          lineTension: 0.2,
          radius: 5,
        },
        {
          label: 'Deaths',
          data: this.generalStats?.deathsArray,
          backgroundColor: 'rgba(75,10,125,.9)',
          borderColor: 'rgb(75,10,125)',
          fill: true,
          lineTension: 0.2,
          radius: 5,
        },
      ],
    };

    // Update chart
    if(this.chart){
      this.resetChart();
      this.chart.update();
    }
  }
  
  /**
   * @inheritdoc
   */
  ngAfterViewInit() {
    let ctx: any = document.getElementById('areaChart') as HTMLElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: this.data,
      options: this.options,
    });
  }

  /**
   * Reset the chart
   */
  resetChart(){
    this.chart.destroy();
    let ctx: any = document.getElementById('areaChart') as HTMLElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: this.data,
      options: this.options,
    });
  }
}
