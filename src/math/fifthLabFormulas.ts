import { Layer } from 'src/models/Layer';
import { GraphPoint } from '../models/GraphPoint';
export class FifthLabCalculation{
    public static CalculateElectronsDensity(points: number[], layer: Layer): GraphPoint[]{
        return points.map(pnt => {
            const point: GraphPoint = {
                x: pnt,
                y: this.GetHeightDensity(pnt, layer)
            };
            return point;
        });
    }
    private static GetHeightDensity(point: number, layer: Layer): number{
        const density = layer.Ner * (((2 * (point - layer.h)) / layer.zm) -
             (Math.pow(point - layer.h, 2) / Math.pow(layer.zm, 2)));
        return Math.round(density);
    }
    public static CalculateTraceDistance(points: number[], layer: Layer, angle: number, frequency: number): GraphPoint[] {
        
        const graphPoints = points.map(pnt => {
            const point: GraphPoint = {
                x: pnt,
                y: this.GetDistance(pnt, layer, angle, frequency)
            }
            return point;
        });
        return graphPoints;
    }
    private static GetDistance(point: number, layer: Layer, angle: number, frequency: number): number{
        const electronsDensity = this.GetHeightDensity(point, layer);
        angle = (90 - angle) / (180 / Math.PI);
        const basicElectronsDensity = this.GetHeightDensity(layer.h, layer);
        const perneability = 1 - 80.8 * (electronsDensity/Math.pow(frequency, 2));
        const basicPerneability = 1 - 80.8 * (basicElectronsDensity / Math.pow(frequency, 2));
        const distance = point / Math.sqrt(1 - (basicPerneability / perneability) * Math.pow(Math.sin(angle), 2));
        return Math.round(distance);
    }
}
