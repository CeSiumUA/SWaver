import { Component, OnInit } from '@angular/core';
import { MetricPrefixes, Utilities } from 'src/math/values';
import { /* ChartDataSets, */ ChartOptions, ChartType, Chart, registerables } from 'chart.js';
import { ChartConfiguration } from 'chart.js';
import { GraphPoint } from '../../../models/GraphPoint';
import { ThirdLabCalculation } from '../../../math/thirdLabFormulas';
import functionPlot from 'function-plot';

@Component({
  selector: 'app-thirdlab',
  templateUrl: './thirdlab.component.html',
  styleUrls: ['./thirdlab.component.css']
})
export class ThirdlabComponent implements OnInit {

  constructor() { }

  public get valuesMap(): string[]{
    const valsmap = Object.keys(MetricPrefixes)
    .filter(val => isNaN(Number(val)) === false)
    .map(key => MetricPrefixes[Number(key)]);
    return valsmap;
  }

  /* public conductivity: number = 0.001;

  public electricalPerneability = 25; */

  public _waveLength: number = 20;
  public _waveLengthMap = 'One';

  public _transmitterHeight: number = 150;
  public _transmitterHeightMap = 'One';

  public _receiverHeight: number = 150;
  public _receiverHeightMap = 'One';

  public _earthSelected: number = 0;

  public _directionalPatternWidth = 90;

  public _traceLength: number = 1;
  public _traceLengthMap = 'k';

  public _normalPolarization = true;
  private firstChart?: Chart;
  private secondChart?: Chart;
  private thirdChart?: Chart;

  public get waveLength(): number{
    return this._waveLength;
  }
  public set waveLength(value: number){
    this._waveLength = value;
    this.UpdateCharts();
  }

  public get waveLengthMap(): string{
    return this._waveLengthMap;
  }
  public set waveLengthMap(value: string){
    this._waveLengthMap = value;
    this.UpdateCharts();
  }

  public get transmitterHeight(): number{
    return this._transmitterHeight;
  }
  public set transmitterHeight(value: number){
    this._transmitterHeight = value;
    this.UpdateCharts();
  }

  public get transmitterHeightMap(): string{
    return this._transmitterHeightMap;
  }
  public set transmitterHeightMap(value: string){
    this._transmitterHeightMap = value;
    this.UpdateCharts();
  }

  public get receiverHeight(): number{
    return this._receiverHeight;
  }
  public set receiverHeight(value: number){
    this._receiverHeight = value;
    this.UpdateCharts();
  }

  public get receiverHeightMap(): string{
    return this._receiverHeightMap;
  }
  public set receiverHeightMap(value: string){
    this._receiverHeightMap = value;
    this.UpdateCharts();
  }

  public get earthSelected(): number{
    return this._earthSelected;
  }
  public set earthSelected(value: number){
    this._earthSelected = value;
    this.UpdateCharts();
  }

  public get directionalPatternWidth(): number{
    return this._directionalPatternWidth;
  }
  public set directionalPatternWidth(value: number){
    this._directionalPatternWidth = value;
    this.UpdateCharts();
  }

  public get traceLength(): number{
    return this._traceLength;
  }
  public set traceLength(value: number){
    this._traceLength = value;
    this.UpdateCharts();
  }

  public get traceLengthMap(): string{
    return this._traceLengthMap;
  }
  public set traceLengthMap(value: string){
    this._traceLengthMap = value;
    this.UpdateCharts();
  }

  public get normalPolarization(): boolean{
    return this._normalPolarization;
  }
  public set normalPolarization(value: boolean){
    this._normalPolarization = value;
    this.UpdateCharts();
  }

  public earthType: DielectricType[] = [{id: 0, type: 'Діелектрик'}, {id: 1, type: 'Провідник'}];

  public get standartParameterToggleLabel(): string {
    return this.normalPolarization ? 'Нормальна' : 'Паралельна';
  }

  private decreasingMultiplexerGraphConfig: ChartConfiguration = {
    type: 'line',
    data: {
      labels: this.AttenuationFactorGraphPoints.map(pnt => pnt.x),
      datasets: [{
        label: 'Залежність інтеференційного множника послаблення від відстані між антенами',
        backgroundColor: 'rgb(255, 90, 132)',
        borderColor: 'rgb(255, 90, 132)',
        data: this.AttenuationFactorGraphPoints.map(pnt => pnt.y)
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
              return `Послаблення: ${a.raw}`;
            }
          }
        }
      }
    }
  };
  private reflectionCoefficientGraphConfig: ChartConfiguration = {
    type: 'line',
    data: {
      labels: this.ReflectionCoefficientGraphPoints.map(pnt => pnt.x),
      datasets: [{
        label: 'Залежність коефіціента відбиття від кута падіння',
        backgroundColor: 'rgb(255, 90, 132)',
        borderColor: 'rgb(255, 90, 132)',
        data: this.ReflectionCoefficientGraphPoints.map(pnt => pnt.y)
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
              return `Коефіціент відбиття: ${a.raw}`;
            }
          }
        }
      }
    }
  };

  public get AttenuationFactorGraphPoints(): GraphPoint[]{
    const distanceCoefficient = Utilities.valuesMap.get(this.valuesMap.indexOf(this.traceLengthMap));
    const realDistance = this.traceLength * (distanceCoefficient ? distanceCoefficient : 1);

    const waveLengthCoefficient = Utilities.valuesMap.get(this.valuesMap.indexOf(this.waveLengthMap));
    const realWaveLength = this.waveLength * (waveLengthCoefficient ? waveLengthCoefficient : 1);

    const transmitterCoefficient = Utilities.valuesMap.get(this.valuesMap.indexOf(this.transmitterHeightMap));
    const realTransmitterHeight = this.transmitterHeight * (transmitterCoefficient ? transmitterCoefficient : 1);

    const receiverCoefficient = Utilities.valuesMap.get(this.valuesMap.indexOf(this.receiverHeightMap));
    const realReceiverHeight = this.receiverHeight * (receiverCoefficient ? receiverCoefficient : 1);

    return this.points.map(pnt => {
      const deltaR = 2 * realTransmitterHeight * Math.cos(Math.atan(pnt / (realTransmitterHeight + realReceiverHeight)));
      return ThirdLabCalculation.CalculateAttenuationFactor(pnt, 1, this.normalPolarization ? 0 : Math.PI / 2, realWaveLength, deltaR);
    });
  }

  public get ReflectionCoefficientGraphPoints(): GraphPoint[] {
    const points: number[] = [];
    for(let x = 0; x <= 360; x += 5){
      points.push(x);
    }
    return points.map(pnt => {
      const angle = pnt * Math.PI / 180;
      return {
        x: pnt,
        y: this.earthSelected === 1 ? 1 : (this.normalPolarization ? (Math.abs((Math.sin(angle) - Math.sqrt(25 - Math.pow(Math.cos(angle), 2))) / (Math.sin(angle) + Math.sqrt(25 - Math.pow(Math.cos(angle), 2))))) :
        (Math.abs((25 * Math.sin(angle) - Math.sqrt(25 - Math.pow(Math.cos(angle), 2))) / (25 * Math.sin(angle) + Math.sqrt(25 - Math.pow(Math.cos(angle), 2))))))
      }
    });
  }

  private UpdateCharts(): void{
    const trajectoryChartPoints = this.AttenuationFactorGraphPoints;
    this.decreasingMultiplexerGraphConfig.data.labels = trajectoryChartPoints.map(pnt => pnt.x);
    this.decreasingMultiplexerGraphConfig.data.datasets[0].data = trajectoryChartPoints.map(pnt => pnt.y);
    this.firstChart?.update();
    const reflectionChartPoints = this.ReflectionCoefficientGraphPoints;
    this.reflectionCoefficientGraphConfig.data.labels = reflectionChartPoints.map(pnt => pnt.x);
    this.reflectionCoefficientGraphConfig.data.datasets[0].data = reflectionChartPoints.map(pnt => pnt.y);
    this.secondChart?.update();
    this.drawEllipse();
  }

  private get points(): number[]{
    const distanceCoefficient = Utilities.valuesMap.get(this.valuesMap.indexOf(this.traceLengthMap));
    const realDistance = this.traceLength * (distanceCoefficient ? distanceCoefficient : 1);
    const numbers: number[] = [];
    for (let i = 0; i < realDistance + 50; i += 10){
      numbers.push(i);
    }
    return numbers;
  }

  public showValue(val: number | string): string{
    return val.toString();
  }

  public drawEllipse(): void{
    const l = this.L;
    const lm = l.Lm;
    const lb = l.Lb;
    functionPlot({
      target: '#thirdGraph',
      width: 800,
      grid: true,
      height: 400,
      xAxis: {
        label: 'Lm',
        domain: [-1 * (Math.sqrt(lb) + 1), (Math.sqrt(lb) + 1)]
      },
      yAxis: {
        label: 'Lb',
        domain: [-1 * (Math.sqrt(lm) + 1), (Math.sqrt(lm) + 1)]
      },
      data: [
        {
          fn: `sqrt((-(x^2)/${lb} + 1)*${lm})`,
        },
        {
          fn: `-sqrt((-(x^2)/${lb} + 1)*${lm})`,
        },
      ]
    });
  }

  private get L(){
    const transmitterCoefficient = Utilities.valuesMap.get(this.valuesMap.indexOf(this.transmitterHeightMap));
    const realTransmitterHeight = this.transmitterHeight * (transmitterCoefficient ? transmitterCoefficient : 1);

    const receiverCoefficient = Utilities.valuesMap.get(this.valuesMap.indexOf(this.receiverHeightMap));
    const realReceiverHeight = this.receiverHeight * (receiverCoefficient ? receiverCoefficient : 1);

    const distanceCoefficient = Utilities.valuesMap.get(this.valuesMap.indexOf(this.traceLengthMap));
    const realDistance = this.traceLength * (distanceCoefficient ? distanceCoefficient : 1);

    const waveLengthCoefficient = Utilities.valuesMap.get(this.valuesMap.indexOf(this.waveLengthMap));
    const realWaveLength = this.waveLength * (waveLengthCoefficient ? waveLengthCoefficient : 1);

    const r1 = realTransmitterHeight / (Math.sin(Math.atan((realReceiverHeight + realTransmitterHeight) / realDistance)));
    const r2 = realReceiverHeight / (Math.sin(Math.atan((realReceiverHeight + realTransmitterHeight) / realDistance)));

    const lm = 2 * Math.sqrt(realWaveLength * r1 * r2 / realDistance);

    const lb = lm * realDistance / Math.sqrt(Math.pow(lm, 2) + Math.pow(realDistance, 2) * ((realReceiverHeight + realTransmitterHeight) / realDistance));
    return {Lm: lm, Lb: lb};
  }

  ngOnInit(): void {
    let context1 = (document.getElementById('thirdCanvas1') as HTMLCanvasElement)?.getContext('2d');
    let context2 = (document.getElementById('thirdCanvas2') as HTMLCanvasElement)?.getContext('2d');
    let context3 = (document.getElementById('thirdCanvas3') as HTMLCanvasElement)?.getContext('2d');
    while (context1 === null || context2 === null || context3 === null){
        context1 = (document.getElementById('thirdCanvas1') as HTMLCanvasElement)?.getContext('2d');
        context2 = (document.getElementById('thirdCanvas2') as HTMLCanvasElement)?.getContext('2d');
        context3 = (document.getElementById('thirdCanvas3') as HTMLCanvasElement)?.getContext('2d');
    }
    if (context1) {
        this.firstChart = new Chart(
            context1,
            this.decreasingMultiplexerGraphConfig
        );
    }
    if (context2) {
        this.secondChart = new Chart(
            context2,
            this.reflectionCoefficientGraphConfig
        );
    }
    if (context3) {

    }
    this.drawEllipse();
  }
}

export interface DielectricType{
  id: number;
  type: string;
}
