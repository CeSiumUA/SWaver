import { Component, OnInit } from '@angular/core';
import { MetricPrefixes } from 'src/math/values';

@Component({
  selector: 'app-thirdlab',
  templateUrl: './thirdlab.component.html',
  styleUrls: ['./thirdlab.component.css']
})
export class ThirdlabComponent implements OnInit {

  public conductivity: number = 0.001;

  public electricalPerneability = 25;

  public waveLength: number = 20;
  public waveLengthMap = 'One';

  public transmitterHeight: number = 150;
  public transmitterHeightMap = 'One';

  public receiverHeight: number = 150;
  public receiverHeightMap = 'One';

  public directionalPatternWidth = 90;

  public traceLength: number = 1;
  public traceLengthMap = 'k';

  public horizontalPolarization = true;

  constructor() { }

  public get valuesMap(): string[]{
    const valsmap = Object.keys(MetricPrefixes)
    .filter(val => isNaN(Number(val)) === false)
    .map(key => MetricPrefixes[Number(key)]);
    return valsmap;
  }

  public showValue(val: number | string): string{
    return val.toString();
  }

  ngOnInit(): void {
  }

}
