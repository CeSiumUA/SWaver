import { Component, OnInit } from '@angular/core';
import { MetricPrefixes } from 'src/math/values';

@Component({
  selector: 'app-fifthlab',
  templateUrl: './fifthlab.component.html',
  styleUrls: ['./fifthlab.component.css']
})
export class FifthlabComponent implements OnInit {

  public frequency = 9.2;
  public frequencyMap = 'M';

  public angle = 30;

  public selectedLayer = 'F';
  public selectedDayTime = 'Day';

  constructor() { }

  ngOnInit(): void {
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

export enum Season{
  Winter = 0,
  Spring = 1,
  Summer = 2,
  Autumn = 3
}
export enum IonosphereLayer{
  D,
  E,
  F,
  F1,
  F2
}
export enum DayTime{
  Day = 0,
  Night = 1
}
