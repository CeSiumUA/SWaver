export class SecondLabCalculation{
    public static CalculateFrenselZoneRadius(waveLength: number, r: number, r1: number, n: number = 1): number{
        const result = Math.sqrt((waveLength * r1 * (r - r1) * n)/(r));
        return result;
    }
}