import { Component, OnInit } from '@angular/core';
import { /* ChartDataSets, */ ChartOptions, ChartType, Chart, registerables } from 'chart.js';
import { ChartConfiguration } from 'chart.js';
import { MetricPrefixes } from 'src/math/values';
import { FourthLabCalculation } from '../../../math/fourthLabFormulas';

@Component({
  selector: 'app-fourthlab',
  templateUrl: './fourthlab.component.html',
  styleUrls: ['./fourthlab.component.css']
})
export class FourthlabComponent implements OnInit {

  public firstHorizontAngle = 0.4;
  public secondHorizontAngle = 1.3;
  public delta = 2;
  public graient = 4;

  private perneabilityGraphConfig: ChartConfiguration = {
    type: 'line',
    data: {
      labels: this.PerneabilityChartBounds,
      datasets: [{
        label: 'Залежність діелектричної проникності від висоти',
        backgroundColor: 'rgb(255, 90, 132)',
        borderColor: 'rgb(255, 90, 132)',
        data: this.PerneabilityChartPoints
      }]
    },
    options: {
      scales: {
        y: {
            beginAtZero: false,
        },
      },
      plugins: {
        tooltip: {
          enabled: true,
          callbacks: {
            label: (a) => {
              return `Діелектрична проникність: ${a.raw}`;
            }
          }
        }
      }
    }
  };

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      const context = (document.getElementById('fourthCanvas1') as HTMLCanvasElement).getContext('2d');
      if(context) {
        const myChart = new Chart(
          context,
          this.perneabilityGraphConfig
        );
      }
    }, 2000);

  }

  public get valuesMap(): string[]{
    const valsmap = Object.keys(MetricPrefixes)
    .filter(val => isNaN(Number(val)) === false)
    .map(key => MetricPrefixes[Number(key)]);
    return valsmap;
  }

  private get PerneabilityChartBounds(): number[]{
    return [0, 100, 200,
       300, 400, 500,
        600, 700, 800,
         900, 1000, 1100,
          1200, 1300, 1400,
           1500, 1600, 1700,
            1800, 1900, 2000,
             2100, 2200, 2300,
              2400, 2500, 2600,
               2700, 2800, 2900,
                3000, 3100, 3200,
                 3300, 3400, 3500,
                  3600, 3700, 3800,
                   3900, 4000, 4100,
                    4200, 4300, 4400,
                     4500, 4600, 4700,
                      4800, 4900, 5000]
  }

  private get PerneabilityChartPoints(): number[]{
    return FourthLabCalculation.CalculateRelativeDielectricPerneabilityGrapg(this.PerneabilityChartBounds).map(pnt => pnt.y);
  }

  public showValue(val: number | string): string{
    return val.toString();
  }
}
