import { GraphPoint } from '../models/GraphPoint';
export class FourthLabCalculation {
    public static CalculateRelativeDielectricPerneabilityGrapg(
        points: number[],
        delta: number = 5.78 * Math.pow(10, -4),
        gradient: number = -7.85 * Math.pow(10, -8)): GraphPoint[]{
            const pointsCollection: GraphPoint[] = points.map(pnt => {
                const pointOnGraph: GraphPoint = {
                    x: pnt,
                    y: this.CalculateRelativeDielectricPerneability(pnt, delta, gradient)
                };
                return pointOnGraph;
            });
            return pointsCollection;
    }
    private static CalculateRelativeDielectricPerneability(point: number, delta: number = 5.78 * Math.pow(10, -4),
                                                           gradient: number = -7.85 * Math.pow(10, -8)): number{
                                                               const exp = Math.exp(gradient * point / delta);
                                                               return 1 + delta * exp;
    }
}
