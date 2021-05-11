import { Component, OnInit } from '@angular/core';
import { utils } from 'protractor';
import { MetricPrefixes, Utilities, lightSpeed } from '../../../math/values';
import { FirstLabCalculation } from '../../../math/firstLabFormulas';

@Component({
    selector: 'firstlab-app',
    templateUrl: './firstlab.component.html',
    styleUrls: ['./firstlab.component.css']
})
export class FirstLabComponent implements OnInit{

    public isDistanceSetMode = true;

    public frequency: number = 50;
    public frequencyMap: string = 'M';
    
    public transmitterPower: number = 10;
    public transmitterPowerMap: string = 'One';

    public transmitterDirectionalFactor = 3;
    public transmitterSWR = 1.2;

    public receiverDirectionalFactor = 6;
    public receiverSWR = 1.5;

    public transmitterLinearAttenuation = 0.01;
    public transmitterAntennaLength = 25;
    public transmitterAntennaLengthMap = 'One';

    public receiverLinearAttenuation = 0.02;
    public receiverAntennaLength = 20;
    public receiverAntennaLengthMap = 'One';

    public distance = 10;
    public distanceMap = 'k';

    public receiverSensitivity = -40;

    constructor(){

    }
    public get calcSetMode(): string{
        return this.isDistanceSetMode ? 'Задання відстані' : 'Задання чутливості приймача';
    }
    public get valuesMap(): string[]{
        let valsmap = Object.keys(MetricPrefixes)
        .filter(val => isNaN(Number(val)) === false)
        .map(key => MetricPrefixes[Number(key)]);
        return valsmap;
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
    public get ReceiverMinimalSensivity(): number{
        return FirstLabCalculation.CalculateMinimalInputSensivity(this.ReceiverInputPower);
    }
    public showValue(val: number | string): string{
        return val.toString();
    }
    ngOnInit(): void{
    }
}