import { Component, OnInit } from '@angular/core';
import { MetricPrefixes, Utilities } from 'src/math/values';
import { /* ChartDataSets, */ ChartOptions, ChartType, Chart, registerables } from 'chart.js';
import { ChartConfiguration } from 'chart.js';
import { GraphPoint } from '../../../models/GraphPoint';
import { ThirdLabCalculation } from '../../../math/thirdLabFormulas';

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

  public waveLength: number = 20;
  public waveLengthMap = 'One';

  public transmitterHeight: number = 150;
  public transmitterHeightMap = 'One';

  public receiverHeight: number = 150;
  public receiverHeightMap = 'One';

  public earthSelected: number = 0;

  public directionalPatternWidth = 90;

  public traceLength: number = 1;
  public traceLengthMap = 'k';

  public normalPolarization = true;
  private firstChart?: Chart;
  private secondChart?: Chart;

  public earthType: DielectricType[] = [{id: 0, type: 'Діелектрик'}, {id: 1, type: 'Провідник'}];

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

  public get AttenuationFactorGraphPoints(): GraphPoint[]{
    const distanceCoefficient = Utilities.valuesMap.get(this.valuesMap.indexOf(this.traceLengthMap));
    const realDistance = this.traceLength * (distanceCoefficient ? distanceCoefficient : 1);

    const waveLengthCoefficient = Utilities.valuesMap.get(this.valuesMap.indexOf(this.waveLengthMap));
    const realWaveLength = this.waveLength * (waveLengthCoefficient ? waveLengthCoefficient : 1);

    const transmitterCoefficient = Utilities.valuesMap.get(this.valuesMap.indexOf(this.transmitterHeightMap));
    const realTransmitterHeight = this.traceLength * (transmitterCoefficient ? transmitterCoefficient : 1);

    const receiverCoefficient = Utilities.valuesMap.get(this.valuesMap.indexOf(this.receiverHeightMap));
    const realReceiverHeight = this.traceLength * (receiverCoefficient ? receiverCoefficient : 1);

    return this.points.map(pnt => {
      const deltaR = 2 * realTransmitterHeight * Math.cos(Math.atan(pnt / (realTransmitterHeight + realReceiverHeight)));
      return ThirdLabCalculation.CalculateAttenuationFactor(pnt, 1, this.normalPolarization ? 0 : Math.PI / 2, realWaveLength, deltaR);
    });
  }

  private get points(): number[]{
    const distanceCoefficient = Utilities.valuesMap.get(this.valuesMap.indexOf(this.traceLengthMap));
    const realDistance = this.traceLength * (distanceCoefficient ? distanceCoefficient : 1);
    const numbers: number[] = [];
    for(let i = 0; i < realDistance + 50; i+= 50){
      numbers.push(i);
    }
    return numbers;
  }

  public showValue(val: number | string): string{
    return val.toString();
  }

  ngOnInit(): void {
    let context1 = (document.getElementById('thirdCanvas1') as HTMLCanvasElement)?.getContext('2d');
    let context2 = (document.getElementById('thirdCanvas2') as HTMLCanvasElement)?.getContext('2d');
    while (context1 === null || context2 === null){
        context1 = (document.getElementById('thirdCanvas1') as HTMLCanvasElement)?.getContext('2d');
        context2 = (document.getElementById('thirdCanvas2') as HTMLCanvasElement)?.getContext('2d');
    }
    if (context1) {
        this.firstChart = new Chart(
            context1,
            this.decreasingMultiplexerGraphConfig
        );
    }
    if (context2) {
        /* this.secondChart = new Chart(
            context2,
            this.powerGraphConfig
        ); */
    }
  }

}

export interface DielectricType{
  id: number;
  type: string;
}
