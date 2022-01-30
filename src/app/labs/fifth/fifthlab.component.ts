import { Component, OnInit } from '@angular/core';
import { /* ChartDataSets, */ ChartOptions, ChartType, Chart, registerables } from 'chart.js';
import { ChartConfiguration } from 'chart.js';
import { MetricPrefixes, Utilities } from 'src/math/values';
import { GraphPoint } from '../../../models/GraphPoint';
import { FifthLabCalculation } from '../../../math/fifthLabFormulas';
import { DayTime, IonosphereLayer, Layer, LayerParameter } from '../../../models/Layer';

@Component({
  selector: 'app-fifthlab',
  templateUrl: './fifthlab.component.html',
  styleUrls: ['./fifthlab.component.css']
})
export class FifthlabComponent implements OnInit {

  private _frequency = 9.2;
  private _frequencyMap = 'M';

  private _angle = 30;

  private _selectedLayer = 'E';
  private _selectedDayTime = 'Day';

  constructor() { }

  private firstChart?: Chart;
  private secondChart?: Chart;

  private traectoryGraphConfig: ChartConfiguration = {
    type: 'line',
    data: {
      labels: this.TraceChartPoints.map(pnt => pnt.x),
      datasets: [{
        label: 'Залежність висоти від пройденої відстані',
        backgroundColor: 'rgb(255, 90, 132)',
        borderColor: 'rgb(255, 90, 132)',
        data: this.TraceChartPoints.map(pnt => pnt.y)
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
            label: (a: { raw: any; }) => {
              return `Висота: ${a.raw}`;
            }
          }
        }
      }
    }
  };

  private densityGraphConfig: ChartConfiguration = {
    type: 'line',
    data: {
      labels: this.DensityChartPoints.map(pnt => pnt.x),
      datasets: [{
        label: 'Залежність електронної щільності від висоти',
        backgroundColor: 'rgb(255, 90, 132)',
        borderColor: 'rgb(255, 90, 132)',
        data: this.DensityChartPoints.map(pnt => pnt.y)
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
              return `Електронна щільність: ${a.raw}`;
            }
          }
        }
      }
    }
  };

  ngOnInit(): void {
    let context1 = (document.getElementById('fifthCanvas1') as HTMLCanvasElement)?.getContext('2d');
    let context2 = (document.getElementById('fifthCanvas2') as HTMLCanvasElement)?.getContext('2d');
    while (context1 === null || context2 === null){
      context1 = (document.getElementById('fifthCanvas1') as HTMLCanvasElement)?.getContext('2d');
      context2 = (document.getElementById('fifthCanvas2') as HTMLCanvasElement)?.getContext('2d');
    }
    if (context1) {
      this.firstChart = new Chart(
        context1,
        this.traectoryGraphConfig
      );
    }
    if (context2) {
      this.secondChart = new Chart(
        context2,
        this.densityGraphConfig
      );
    }
  }

  public get selectedLayer(): string{
    return this._selectedLayer;
  }

  public set selectedLayer(value: string){
    this._selectedLayer = value;
    this.UpdateCharts();
  }

  public get selectedDayTime(): string{
    return this._selectedDayTime;
  }

  public set selectedDayTime(value: string){
    this._selectedDayTime = value;
    this.UpdateCharts();
  }

  public get frequency(): number{
    return this._frequency;
  }

  public set frequency(value: number){
    this._frequency = value;
    this.UpdateCharts();
  }

  public get frequencyMap(): string{
    return this._frequencyMap;
  }

  public set frequencyMap(value: string){
    this._frequencyMap = value;
    this.UpdateCharts();
  }

  public get angle(): number{
    return this._angle;
  }

  public set angle(value: number){
    this._angle = value;
    this.UpdateCharts();
  }

  public get DensityChartPoints(): GraphPoint[] {
    const layer = this.GetLayer();
    const points = this.GetHeightPoints(layer);
    return FifthLabCalculation.CalculateElectronsDensity(points, layer);
  }

  public get TraceChartPoints(): GraphPoint[] {
    const layer = this.GetLayer();
    const points = this.GetHeightPoints(layer);
    const frequencyCoefficient = Utilities.valuesMap.get(this.valuesMap.indexOf(this.frequencyMap));
    const realFrequency = this.frequency * (frequencyCoefficient ? frequencyCoefficient : 1);
    return FifthLabCalculation.CalculateTraceDistance(points, layer, this.angle, realFrequency);
  }

  private GetHeightPoints(layer: Layer): number[]{
    const min = layer.h;
    const max = layer.h + 2 * layer.zm;
    const points: number[] = [];
    for (let i = min; i < max; i += 2){
      points.push(i);
    }
    return points;
  }

  private UpdateCharts(): void{
    const trajectoryChartPoints = this.TraceChartPoints;
    this.traectoryGraphConfig.data.labels = trajectoryChartPoints.map(pnt => pnt.x);
    this.traectoryGraphConfig.data.datasets[0].data = trajectoryChartPoints.map(pnt => pnt.y);
    this.firstChart?.update();
    const densityChartPoints = this.DensityChartPoints;
    this.densityGraphConfig.data.labels = densityChartPoints.map(pnt => pnt.x);
    this.densityGraphConfig.data.datasets[0].data = densityChartPoints.map(pnt => pnt.y);
    this?.secondChart?.update();
  }

  private GetLayer(): Layer{
    const layerLevel = IonosphereLayer[this.selectedLayer as keyof typeof IonosphereLayer];
    const layerParameters = LayerParameter.get(layerLevel);
    const dayTime = DayTime[this.selectedDayTime as keyof typeof DayTime];
    const layer = layerParameters?.get(dayTime);
    if (layer) { return layer; }
    return {} as Layer;
  }

  public get valuesMap(): string[]{
    const valsmap = Object.keys(MetricPrefixes)
    .filter(val => isNaN(Number(val)) === false)
    .map(key => MetricPrefixes[Number(key)]);
    return valsmap;
  }

  public get IonospheresLayersValues(): string[]{
    const layersmap = Object.keys(IonosphereLayer)
    .filter(val => isNaN(Number(val)) === false)
    .map(key => IonosphereLayer[Number(key)]);
    return layersmap;
  }

  public get DayTimeValues(): string[]{
    const layersmap = Object.keys(DayTime)
    .filter(val => isNaN(Number(val)) === false)
    .map(key => DayTime[Number(key)]);
    return layersmap;
  }

  public showValue(val: number | string): string{
    return val.toString();
  }
}


