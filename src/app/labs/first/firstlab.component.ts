import { AfterContentInit, Component, OnInit } from '@angular/core';
import { utils } from 'protractor';
import { MetricPrefixes, Utilities, lightSpeed } from '../../../math/values';
import { FirstLabCalculation } from '../../../math/firstLabFormulas';
import { /* ChartDataSets, */ ChartOptions, ChartType, Chart, registerables } from 'chart.js';
import { ChartConfiguration } from 'chart.js';
import { GraphPoint } from '../../../models/GraphPoint';
import {retry} from 'rxjs/operators';

@Component({
    selector: 'firstlab-app',
    templateUrl: './firstlab.component.html',
    styleUrls: ['./firstlab.component.css']
})
export class FirstLabComponent implements OnInit{

    public _isDistanceSetMode = true;

    public _frequency = 50;
    public _frequencyMap = 'M';

    public _transmitterPower = 10;
    public _transmitterPowerMap = 'One';

    public _transmitterDirectionalFactor = 3;
    public _transmitterSWR = 1.2;

    public _receiverDirectionalFactor = 6;
    public _receiverSWR = 1.5;

    public _transmitterLinearAttenuation = 0.01;
    public _transmitterAntennaLength = 25;
    public _transmitterAntennaLengthMap = 'One';

    public _receiverLinearAttenuation = 0.02;
    public _receiverAntennaLength = 20;
    public _receiverAntennaLengthMap = 'One';

    public _distance = 10;
    public _distanceMap = 'k';

    private firstChart?: Chart;

    public _receiverSensitivity = -40;

    private sensivityGraphConfig: ChartConfiguration = {
        type: 'line',
        data: {
          labels: this.TraceChartPoints.map(pnt => pnt.x),
          datasets: [{
            label: 'Залежність чутливості від відстані',
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
                label: (a) => {
                  return `Висота: ${a.raw}`;
                }
              }
            }
          }
        }
      };

    constructor(){

    }
    ngOnInit(): void {
        let context1 = (document.getElementById('firstCanvas1') as HTMLCanvasElement)?.getContext('2d');
        while (context1 === null){
            context1 = (document.getElementById('firstCanvas1') as HTMLCanvasElement)?.getContext('2d');
        }
        if (context1) {
            this.firstChart = new Chart(
            context1,
            this.sensivityGraphConfig
            );
        }
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

    public get transmitterPower(): number{
        return this._transmitterPower;
    }
    public set transmitterPower(value: number){
        this._transmitterPower = value;
        this.UpdateCharts();
    }

    public get transmitterPowerMap(): string{
        return this._transmitterPowerMap;
    }
    public set transmitterPowerMap(value: string){
        this._transmitterPowerMap = value;
        this.UpdateCharts();
    }

    public get transmitterDirectionalFactor(): number{
        return this._transmitterDirectionalFactor;
    }
    public set transmitterDirectionalFactor(value: number){
        this._transmitterDirectionalFactor = value;
        this.UpdateCharts();
    }

    public get transmitterSWR(): number{
        return this._transmitterSWR;
    }
    public set transmitterSWR(value: number){
        this._transmitterSWR = value;
        this.UpdateCharts();
    }

    public get receiverDirectionalFactor(): number{
        return this._receiverDirectionalFactor;
    }
    public set receiverDirectionalFactor(value: number){
        this._receiverDirectionalFactor = value;
        this.UpdateCharts();
    }

    public get receiverSWR(): number{
        return this._receiverSWR;
    }
    public set receiverSWR(value: number){
        this._receiverSWR = value;
        this.UpdateCharts();
    }

    public get transmitterLinearAttenuation(): number{
        return this._transmitterLinearAttenuation;
    }
    public set transmitterLinearAttenuation(value: number){
        this._transmitterLinearAttenuation = value;
        this.UpdateCharts();
    }

    public get transmitterAntennaLength(): number{
        return this._transmitterAntennaLength;
    }
    public set transmitterAntennaLength(value: number){
        this._transmitterAntennaLength = value;
        this.UpdateCharts();
    }

    public get transmitterAntennaLengthMap(): string{
        return this._transmitterAntennaLengthMap;
    }
    public set transmitterAntennaLengthMap(value: string){
        this._transmitterAntennaLengthMap = value;
        this.UpdateCharts();
    }

    public get receiverLinearAttenuation(): number{
        return this._receiverLinearAttenuation;
    }
    public set receiverLinearAttenuation(value: number){
        this._receiverLinearAttenuation = value;
        this.UpdateCharts();
    }

    public get receiverAntennaLength(): number{
        return this._receiverAntennaLength;
    }
    public set receiverAntennaLength(value: number){
        this._receiverAntennaLength = value;
        this.UpdateCharts();
    }

    public get receiverAntennaLengthMap(): string{
        return this._receiverAntennaLengthMap;
    }
    public set receiverAntennaLengthMap(value: string){
        this._receiverAntennaLengthMap = value;
        this.UpdateCharts();
    }

    public get distance(): number{
        return this._distance;
    }
    public set distance(value: number){
        this._distance = value;
        this.UpdateCharts();
    }

    public get distanceMap(): string{
        return this._distanceMap;
    }
    public set distanceMap(value: string){
        this._distanceMap = value;
        this.UpdateCharts();
    }

    public get receiverSensitivity(): number{
        return this._receiverSensitivity;
    }
    public set receiverSensitivity(value: number){
        this._receiverSensitivity = value;
        this.UpdateCharts();
    }

    public get isDistanceSetMode(): boolean{
        return this._isDistanceSetMode;
    }
    public set isDistanceSetMode(value: boolean){
        this._isDistanceSetMode = value;
        this.UpdateCharts();
    }
    private UpdateCharts(): void{
        const trajectoryChartPoints = this.TraceChartPoints;
        this.sensivityGraphConfig.data.labels = trajectoryChartPoints.map(pnt => pnt.x);
        this.sensivityGraphConfig.data.datasets[0].data = trajectoryChartPoints.map(pnt => pnt.y);
        this.firstChart?.update();
      }
    public get calcSetMode(): string{
        return this.isDistanceSetMode ? 'Задання відстані' : 'Задання чутливості приймача';
    }
    public get valuesMap(): string[]{
        const valsmap = Object.keys(MetricPrefixes)
        .filter(val => isNaN(Number(val)) === false)
        .map(key => MetricPrefixes[Number(key)]);
        return valsmap;
    }
    public get TraceChartPoints(): GraphPoint[] {
        let maxRange = this.MaxTransmissionRange;
        if (this.isDistanceSetMode){
            const transmittingRangeCoefficient = Utilities.valuesMap.get(this.valuesMap.indexOf(this.distanceMap));
            const realRange = this.distance * (transmittingRangeCoefficient ? transmittingRangeCoefficient : 1);
            maxRange = realRange;
        }
        const frequencyCoefficient = Utilities.valuesMap.get(this.valuesMap.indexOf(this.frequencyMap));
        const realFrequency = this.frequency * (frequencyCoefficient ? frequencyCoefficient : 1);
        const waveLength = lightSpeed / realFrequency;

        const powerCoefficient = Utilities.valuesMap.get(this.valuesMap.indexOf(this.transmitterPowerMap));
        const realTransmitterPower = this.transmitterPower * (powerCoefficient ? powerCoefficient : 1);
        const distancePoints: GraphPoint[] = [];
        for (let x = 0; x <= maxRange; x += 200){
            const y = FirstLabCalculation.CalculateReceiverInputPower(realTransmitterPower,
                this.transmitterDirectionalFactor,
                this.receiverDirectionalFactor,
                this.TransmitterEfficiency,
                this.ReceiverEfficiency,
                waveLength,
                x);
            distancePoints.push({
                x,
                y
            });
        }
        return distancePoints;
    }
    public get ReceiverInputPower(): number{
        const frequencyCoefficient = Utilities.valuesMap.get(this.valuesMap.indexOf(this.frequencyMap));
        const realFrequency = this.frequency * (frequencyCoefficient ? frequencyCoefficient : 1);
        const waveLength = lightSpeed / realFrequency;

        const powerCoefficient = Utilities.valuesMap.get(this.valuesMap.indexOf(this.transmitterPowerMap));
        const realTransmitterPower = this.transmitterPower * (powerCoefficient ? powerCoefficient : 1);

        const transmittingRangeCoefficient = Utilities.valuesMap.get(this.valuesMap.indexOf(this.distanceMap));
        const realRange = this.distance * (transmittingRangeCoefficient ? transmittingRangeCoefficient : 1);

        return FirstLabCalculation.CalculateReceiverInputPower(realTransmitterPower,
            this.transmitterDirectionalFactor,
            this.receiverDirectionalFactor,
            this.TransmitterEfficiency,
            this.ReceiverEfficiency,
            waveLength,
            realRange);
    }
    public get ReceiverInputPowerRounded(): number|string{
      return this.roundValue(this.ReceiverInputPower);
    }

    public get TransmitterEfficiency(): number{
        const prefix = this.valuesMap.indexOf(this.transmitterAntennaLengthMap);
        const lengthValueCoefficient = Utilities.valuesMap.get(prefix);
        const realLengthValue = this.transmitterAntennaLength * (lengthValueCoefficient ? lengthValueCoefficient : 1);
        return FirstLabCalculation.CalculateEfficiency(this.transmitterLinearAttenuation, realLengthValue, this.transmitterSWR);
    }
    public get EffectiveReceiverSquare(): number{
        const frequencyCoefficient = Utilities.valuesMap.get(this.valuesMap.indexOf(this.frequencyMap));
        const realFrequency = this.frequency * (frequencyCoefficient ? frequencyCoefficient : 1);
        const waveLength = lightSpeed / realFrequency;

        return FirstLabCalculation.CalculateEffectiveReceiverSquare(waveLength, this.receiverDirectionalFactor);
    }
    public get ReceiverEfficiency(): number{
        const prefix = this.valuesMap.indexOf(this.receiverAntennaLengthMap);
        const lengthValueCoefficient = Utilities.valuesMap.get(prefix);
        const realLengthValue = this.receiverAntennaLength * (lengthValueCoefficient ? lengthValueCoefficient : 1);
        return FirstLabCalculation.CalculateEfficiency(this.receiverLinearAttenuation, realLengthValue, this.receiverSWR);
    }
    public get MaxTransmissionRange(): number{
        const powerCoefficient = Utilities.valuesMap.get(this.valuesMap.indexOf(this.transmitterPowerMap));
        const realTransmitterPower = this.transmitterPower * (powerCoefficient ? powerCoefficient : 1);

        const frequencyCoefficient = Utilities.valuesMap.get(this.valuesMap.indexOf(this.frequencyMap));
        const realFrequency = this.frequency * (frequencyCoefficient ? frequencyCoefficient : 1);
        const waveLength = lightSpeed / realFrequency;

        return FirstLabCalculation.CalculateRange(realTransmitterPower,
             this.transmitterDirectionalFactor,
              this.receiverDirectionalFactor,
               this.TransmitterEfficiency,
                this.ReceiverEfficiency,
                    waveLength, this.receiverSensitivity);
    }

    public get EffectiveReceiverSquareRounded(): number|string{
      return this.roundValue(this.EffectiveReceiverSquare);
    }

    public get ReceiverEfficiencyRounded(): number|string{
      return this.roundValue(this.ReceiverEfficiency);
    }

    public get MaxTransmissionRangeRounded(): number|string{
      return this.roundValue(this.MaxTransmissionRange);
    }

    public get TransmitterEfficiencyRounded(): number|string{
      return this.roundValue(this.TransmitterEfficiency);
    }

    public get ReceiverMinimalSensivity(): number{
        return FirstLabCalculation.CalculateMinimalInputSensivity(this.ReceiverInputPower);
    }

    public get ReceiverMinimalSensitivityRounded(): number|string{
      return this.roundValue(this.ReceiverMinimalSensivity);
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

    public showValue(val: number | string): string{
        return val.toString();
    }
}
