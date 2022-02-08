import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { /* ChartDataSets, */ ChartOptions, ChartType, Chart, registerables } from 'chart.js';
import { ChartConfiguration } from 'chart.js';
import { MetricPrefixes, Utilities } from 'src/math/values';
import { SecondLabCalculation } from '../../../math/secondLabFormulas';
import { GraphPoint } from '../../../models/GraphPoint';

@Component({
    selector: 'secondlab-app',
    templateUrl: './secondlab.component.html',
    styleUrls: ['./secondlab.component.css']
})
export class SecondLabComponent implements OnInit{

    constructor(){

    }
    public get valuesMap(): string[]{
        const valsmap = Object.keys(MetricPrefixes)
        .filter(val => isNaN(Number(val)) === false)
        .map(key => MetricPrefixes[Number(key)]);
        return valsmap;
    }

    public get NumericFrenzelZoneRadiusGraphPoints(): GraphPoint[]{
        const traceLengthCoefficient = Utilities.valuesMap.get(this.valuesMap.indexOf(this.traceLengthMap));
        const realTracelength = this.traceLength * (traceLengthCoefficient ? traceLengthCoefficient : 1);

        const distancePoints: number[] = [];

        for(let x = 0; x < realTracelength + 100; x += 100){
            distancePoints.push(x);
        }

        const waveLengthCoefficient = Utilities.valuesMap.get(this.valuesMap.indexOf(this.waveLengthMap));
        const realWaveLength = this.waveLength * (waveLengthCoefficient ? waveLengthCoefficient : 1);

        return distancePoints.map(pnt => {
            return {
                x: pnt,
                y: SecondLabCalculation.CalculateFrenselZoneRadius(realWaveLength, realTracelength, pnt, this.zoneNumber)
            };
        });
    }

    public get PowerChartPoints(): GraphPoint[]{
        return [];
    }

    public get FrenselZoneRadius(): number{
        const traceLengthCoefficient = Utilities.valuesMap.get(this.valuesMap.indexOf(this.traceLengthMap));
        const realTracelength = this.traceLength * (traceLengthCoefficient ? traceLengthCoefficient : 1);

        const distanceCoefficient = Utilities.valuesMap.get(this.valuesMap.indexOf(this.distanceToDiafragmMap));
        const realDistance = this.distanceToDiafragm * (distanceCoefficient ? distanceCoefficient : 1);

        const waveLengthCoefficient = Utilities.valuesMap.get(this.valuesMap.indexOf(this.waveLengthMap));
        const realWaveLength = this.waveLength * (waveLengthCoefficient ? waveLengthCoefficient : 1);

        return SecondLabCalculation.CalculateFrenselZoneRadius(realWaveLength, realTracelength, realDistance, this.zoneNumber);
    }
    public get FrenselZoneRadiusRounded(): number | string{
      return this.roundValue(this.FrenselZoneRadius);
    }
    public _traceLength = 20;
    public _traceLengthMap = 'k';

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

    public _waveLength = 50;
    public _waveLengthMap = 'One';

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

    public _angle = 15;

    public get angle(): number{
        return this._angle;
    }
    public set angle(value: number){
        this._angle = value;
        this.UpdateCharts();
    }

    public _distanceToDiafragm = 18;
    public _distanceToDiafragmMap = 'k';

    public get distanceToDiafragm(): number{
        return this._distanceToDiafragm;
    }
    public set distanceToDiafragm(value: number){
        this._distanceToDiafragm = value;
        this.UpdateCharts();
    }

    public get distanceToDiafragmMap(): string{
        return this._distanceToDiafragmMap;
    }
    public set distanceToDiafragmMap(value: string){
        this._distanceToDiafragmMap = value;
        this.UpdateCharts();
    }

    public _directed = false;

    public get directed(): boolean{
        return this._directed;
    }
    public set directed(value: boolean){
        this._directed = value;
        this.UpdateCharts();
    }

    public _diafragmRadius = 1;

    public get diafragmRadius(): number{
        return this._diafragmRadius;
    }
    public set diafragmRadius(value: number){
        this._diafragmRadius = value;
        this.UpdateCharts();
    }

    public _zoneNumber = 1;

    public get zoneNumber(): number{
        return this._zoneNumber;
    }
    public set zoneNumber(value: number){
        this._zoneNumber = value;
        this.UpdateCharts();
    }

  private roundValue(numm: number): number|string{
    const value = Math.round(numm * 1000) / 1000;
    if (value === 0){
      const a = 1 / numm;
      const decimals = Math.floor(Math.log10(a));
      return ((Math.round(numm * Math.pow(10, decimals) * 1000) / 1000.0) * Math.pow(10.0, -decimals));
    }
    return value;
  }

    private firstChart?: Chart;
    private secondChart?: Chart;
    private radiusGraphConfig: ChartConfiguration = {
        type: 'line',
        data: {
          labels: this.NumericFrenzelZoneRadiusGraphPoints.map(pnt => pnt.x),
          datasets: [{
            label: 'Залежність радіуса 1 зони Френеля від відстані до діафрагми',
            backgroundColor: 'rgb(255, 90, 132)',
            borderColor: 'rgb(255, 90, 132)',
            data: this.NumericFrenzelZoneRadiusGraphPoints.map(pnt => pnt.y)
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
                  return `Радіус: ${a.raw}`;
                }
              }
            }
          }
        }
    };
    private powerGraphConfig: ChartConfiguration = {
        type: 'line',
        data: {
          labels: this.PowerChartPoints.map(pnt => pnt.x),
          datasets: [{
            label: 'Залежність радіуса 1 зони Френеля від відстані до діафрагми',
            backgroundColor: 'rgb(255, 90, 132)',
            borderColor: 'rgb(255, 90, 132)',
            data: this.PowerChartPoints.map(pnt => pnt.y)
          }]
        },
        options: {
          scales: {
            y: {
                beginAtZero: false,
            },
          },
          plugins: {
          }
        }
    };
    private UpdateCharts(): void{
        const trajectoryChartPoints = this.NumericFrenzelZoneRadiusGraphPoints;
        this.radiusGraphConfig.data.labels = trajectoryChartPoints.map(pnt => pnt.x);
        this.radiusGraphConfig.data.datasets[0].data = trajectoryChartPoints.map(pnt => pnt.y);
        this.firstChart?.update();
        const powerChartPoints = this.PowerChartPoints;
        this.powerGraphConfig.data.labels = powerChartPoints.map(pnt => pnt.x);
        this.powerGraphConfig.data.datasets[0].data = powerChartPoints.map(pnt => pnt.y);
        this?.secondChart?.update();
    };
    ngOnInit(): void {
        let context1 = (document.getElementById('secondCanvas1') as HTMLCanvasElement)?.getContext('2d');
        let context2 = (document.getElementById('secondCanvas2') as HTMLCanvasElement)?.getContext('2d');
        while (context1 === null || context2 === null){
            context1 = (document.getElementById('secondCanvas1') as HTMLCanvasElement)?.getContext('2d');
            context2 = (document.getElementById('secondCanvas2') as HTMLCanvasElement)?.getContext('2d');
        }
        if (context1) {
            this.firstChart = new Chart(
                context1,
                this.radiusGraphConfig
            );
        }
        if (context2) {
            /* this.secondChart = new Chart(
                context2,
                this.powerGraphConfig
            ); */
        }
    }
    public showValue(val: number | string): string{
        return val.toString();
    }
}
