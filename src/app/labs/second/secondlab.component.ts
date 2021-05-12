import { Component } from '@angular/core';
import { MetricPrefixes, Utilities } from 'src/math/values';
import { SecondLabCalculation } from '../../../math/secondLabFormulas';

@Component({
    selector: 'secondlab-app',
    templateUrl: './secondlab.component.html',
    styleUrls: ['./secondlab.component.css']
})
export class SecondLabComponent{
    public traceLength = 20;
    public traceLengthMap = 'k';

    public waveLength = 50;
    public waveLengthMap = 'One';

    public angle = 15;
    
    public distanceToDiafragm = 18;
    public distanceToDiafragmMap = 'k';

    public directed = false;

    public diafragmRadius = 1;

    public zoneNumber = 1;

    constructor(){

    }
    public get valuesMap(): string[]{
        const valsmap = Object.keys(MetricPrefixes)
        .filter(val => isNaN(Number(val)) === false)
        .map(key => MetricPrefixes[Number(key)]);
        return valsmap;
    }
    public showValue(val: number | string): string{
        return val.toString();
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
}