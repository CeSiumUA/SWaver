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
}
