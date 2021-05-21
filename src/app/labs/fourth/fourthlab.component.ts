import { Component, OnInit } from '@angular/core';
import { /* ChartDataSets, */ ChartOptions, ChartType, Chart, registerables } from 'chart.js';
import { ChartConfiguration } from 'chart.js';
import { MetricPrefixes } from 'src/math/values';
import { FourthLabCalculation } from '../../../math/fourthLabFormulas';
import { GraphPoint } from '../../../models/GraphPoint';

@Component({
  selector: 'app-fourthlab',
  templateUrl: './fourthlab.component.html',
  styleUrls: ['./fourthlab.component.css']
})
export class FourthlabComponent implements OnInit {

  public _horizontAngle = 0.4;
  public _delta = 2;
  public _graient = 4;

  private firstChart?: Chart;
  private secondChart?: Chart;

  private _userStandartParameters: boolean = true;

  public get userStandartParameters(): boolean {
    return this._userStandartParameters;
  }

  public set userStandartParameters(value: boolean){
    this._userStandartParameters = value;
    this.perneabilityGraphConfig.data.datasets[0].data = this.PerneabilityChartPoints;
    const distanceChartPoints = this.DistanceChartPoints;
    this.heightGraphConfig.data.labels = distanceChartPoints.map(pnt => pnt.x);
    this.heightGraphConfig.data.datasets[0].data = distanceChartPoints.map(pnt => pnt.y);
    this.secondChart?.update();
    this.firstChart?.update();
  }

  public get horizontAngle(): number {
    return this._horizontAngle;
  }

  public set horizontAngle(value: number) {
    this._horizontAngle = value;
    this.perneabilityGraphConfig.data.datasets[0].data = this.PerneabilityChartPoints;
    const distanceChartPoints = this.DistanceChartPoints;
    this.heightGraphConfig.data.labels = distanceChartPoints.map(pnt => pnt.x);
    this.heightGraphConfig.data.datasets[0].data = distanceChartPoints.map(pnt => pnt.y);
    this.secondChart?.update();
    this.firstChart?.update();
  }

  public get gradient(): number {
    return this._graient;
  }

  public set gradient(value: number) {
    this._graient = value;
    this.perneabilityGraphConfig.data.datasets[0].data = this.PerneabilityChartPoints;
    const distanceChartPoints = this.DistanceChartPoints;
    this.heightGraphConfig.data.labels = distanceChartPoints.map(pnt => pnt.x);
    this.heightGraphConfig.data.datasets[0].data = distanceChartPoints.map(pnt => pnt.y);
    this.secondChart?.update();
    this.firstChart?.update();
  }

  public get delta(): number {
    return this._delta;
  }

  public set delta(value: number) {
    this._delta = value;
    this.perneabilityGraphConfig.data.datasets[0].data = this.PerneabilityChartPoints;
    const distanceChartPoints = this.DistanceChartPoints;
    this.heightGraphConfig.data.labels = distanceChartPoints.map(pnt => pnt.x);
    this.heightGraphConfig.data.datasets[0].data = distanceChartPoints.map(pnt => pnt.y);
    this.secondChart?.update();
    this.firstChart?.update();
  }

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

  private heightGraphConfig: ChartConfiguration = {
    type: 'line',
    data: {
      labels: this.DistanceChartPoints.map(pnt => pnt.x),
      datasets: [{
        label: 'Залежність пройденої відстані від висоти',
        backgroundColor: 'rgb(255, 90, 132)',
        borderColor: 'rgb(255, 90, 132)',
        data: this.DistanceChartPoints.map(pnt => pnt.y)
      }]
    },
    options: {
      scales: {
        y: {
            beginAtZero: true,
        },
      },
      plugins: {
        tooltip: {
          enabled: true,
          callbacks: {
            label: (a) => {
              return `Висота: ${a.raw}`;
            }
          }
        }
      }
    }
  };

  constructor() { }

  ngOnInit(): void {
    let context1 = (document.getElementById('fourthCanvas1') as HTMLCanvasElement)?.getContext('2d');
    let context2 = (document.getElementById('fourthCanvas2') as HTMLCanvasElement)?.getContext('2d');
    while(context1 === null || context2 === null){
      context1 = (document.getElementById('fourthCanvas1') as HTMLCanvasElement)?.getContext('2d');
      context2 = (document.getElementById('fourthCanvas2') as HTMLCanvasElement)?.getContext('2d');
    }
    if(context1) {
      this.firstChart = new Chart(
        context1,
        this.perneabilityGraphConfig
      );
    }
    if(context2) {
      this.secondChart = new Chart(
        context2,
        this.heightGraphConfig
      );
    }
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

  private get HeightChartBounds(): number[] {
    const heights: number[] = [];
    for(let i = 0; i < 20000; i += 500){
      heights.push(i);
    }
    return heights;
  }

  private get DistanceChartPoints(): GraphPoint[] {
    if(this.userStandartParameters){
      return FourthLabCalculation.CalculateDistanceGraph(this.HeightChartBounds, this.horizontAngle);
    }
    return FourthLabCalculation.CalculateDistanceGraph(this.HeightChartBounds, this.horizontAngle,
       this.delta * Math.pow(10, -4), (-1 * this.gradient * Math.pow(10, -8)));
  }

  private get PerneabilityChartPoints(): number[]{
    if(this.userStandartParameters){
      return FourthLabCalculation.CalculateRelativeDielectricPerneabilityGrapg(this.PerneabilityChartBounds).map(pnt => pnt.y);
    }
    return FourthLabCalculation.CalculateRelativeDielectricPerneabilityGrapg(this.PerneabilityChartBounds,
       this.delta * Math.pow(10, -4), (-1 * this.gradient * Math.pow(10, -8))).map(pnt => pnt.y);
  }

  public get standartParameterToggleLabel(): string {
    return this.userStandartParameters ? 'Нормальна' : 'Довільна';
  }

  public showValue(val: number | string): string{
    return val.toString();
  }
}
