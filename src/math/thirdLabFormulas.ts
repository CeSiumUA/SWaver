import { GraphPoint } from '../models/GraphPoint';
export class ThirdLabCalculation {
    public static CalculateAttenuationFactor(point: number, reflectionCoefficient: number,
         complexPhaseCoefficient: number, waveLength: number, traceDifference: number): GraphPoint{
        const phaseCoefficient: number = 2 * Math.PI / waveLength;
        return {
            x: point,
            y: Math.sqrt(1 + Math.pow(reflectionCoefficient, 2) + 2 * 
            reflectionCoefficient * Math.cos(phaseCoefficient * traceDifference - complexPhaseCoefficient))
        };
    }
}