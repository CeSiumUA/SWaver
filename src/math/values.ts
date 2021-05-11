export enum MetricPrefixes
{
    Y,
    Z,
    E,
    P,
    T,
    G,
    M,
    k,
    h,
    da,
    One,
    d,
    c,
    m,
    μ,
    n,
    p,
    f,
    a,
    z,
    y,
    Percents
}

export enum UnitsOfMeasurement
{
    Meter,
    Kilogram,
    Second,
    Hertz,
    Units,
    Degree,
    Percents,
    SiemensOnMeter,
    MetersPerSecond,
    Other
}

export const lightSpeed = 3 * Math.pow(10, 8);

export class Utilities{
    public static valuesMap: Map<MetricPrefixes, number> = new Map([
        [MetricPrefixes.Y, Math.pow(10, 24)],
        [MetricPrefixes.Z, Math.pow(10, 21)],
        [MetricPrefixes.E, Math.pow(10, 18)],
        [MetricPrefixes.P, Math.pow(10, 15)],
        [MetricPrefixes.T, Math.pow(10, 12)],
        [MetricPrefixes.G, Math.pow(10, 9)],
        [MetricPrefixes.M, Math.pow(10, 6)],
        [MetricPrefixes.k, Math.pow(10, 3)],
        [MetricPrefixes.h, Math.pow(10, 2)],
        [MetricPrefixes.da, Math.pow(10, 1)],
        [MetricPrefixes.One, Math.pow(10, 0)],
        [MetricPrefixes.d, Math.pow(10, -1)],
        [MetricPrefixes.c, Math.pow(10, -2)],
        [MetricPrefixes.m, Math.pow(10, -3)],
        [MetricPrefixes.μ, Math.pow(10, -6)],
        [MetricPrefixes.n, Math.pow(10, -9)],
        [MetricPrefixes.p, Math.pow(10, -12)],
        [MetricPrefixes.f, Math.pow(10, -15)],
        [MetricPrefixes.a, Math.pow(10, -18)],
        [MetricPrefixes.z, Math.pow(10, -21)],
        [MetricPrefixes.y, Math.pow(10, -24)],
        [MetricPrefixes.Percents, Math.pow(10, -2)]
    ]); 
}