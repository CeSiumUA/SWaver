"use strict";
exports.__esModule = true;
exports.Utilities = exports.lightSpeed = exports.UnitsOfMeasurement = exports.MetricPrefixes = void 0;
var MetricPrefixes;
(function (MetricPrefixes) {
    MetricPrefixes[MetricPrefixes["Y"] = 0] = "Y";
    MetricPrefixes[MetricPrefixes["Z"] = 1] = "Z";
    MetricPrefixes[MetricPrefixes["E"] = 2] = "E";
    MetricPrefixes[MetricPrefixes["P"] = 3] = "P";
    MetricPrefixes[MetricPrefixes["T"] = 4] = "T";
    MetricPrefixes[MetricPrefixes["G"] = 5] = "G";
    MetricPrefixes[MetricPrefixes["M"] = 6] = "M";
    MetricPrefixes[MetricPrefixes["k"] = 7] = "k";
    MetricPrefixes[MetricPrefixes["h"] = 8] = "h";
    MetricPrefixes[MetricPrefixes["da"] = 9] = "da";
    MetricPrefixes[MetricPrefixes["One"] = 10] = "One";
    MetricPrefixes[MetricPrefixes["d"] = 11] = "d";
    MetricPrefixes[MetricPrefixes["c"] = 12] = "c";
    MetricPrefixes[MetricPrefixes["m"] = 13] = "m";
    MetricPrefixes[MetricPrefixes["\u03BC"] = 14] = "\u03BC";
    MetricPrefixes[MetricPrefixes["n"] = 15] = "n";
    MetricPrefixes[MetricPrefixes["p"] = 16] = "p";
    MetricPrefixes[MetricPrefixes["f"] = 17] = "f";
    MetricPrefixes[MetricPrefixes["a"] = 18] = "a";
    MetricPrefixes[MetricPrefixes["z"] = 19] = "z";
    MetricPrefixes[MetricPrefixes["y"] = 20] = "y";
    MetricPrefixes[MetricPrefixes["Percents"] = 21] = "Percents";
})(MetricPrefixes = exports.MetricPrefixes || (exports.MetricPrefixes = {}));
var UnitsOfMeasurement;
(function (UnitsOfMeasurement) {
    UnitsOfMeasurement[UnitsOfMeasurement["Meter"] = 0] = "Meter";
    UnitsOfMeasurement[UnitsOfMeasurement["Kilogram"] = 1] = "Kilogram";
    UnitsOfMeasurement[UnitsOfMeasurement["Second"] = 2] = "Second";
    UnitsOfMeasurement[UnitsOfMeasurement["Hertz"] = 3] = "Hertz";
    UnitsOfMeasurement[UnitsOfMeasurement["Units"] = 4] = "Units";
    UnitsOfMeasurement[UnitsOfMeasurement["Degree"] = 5] = "Degree";
    UnitsOfMeasurement[UnitsOfMeasurement["Percents"] = 6] = "Percents";
    UnitsOfMeasurement[UnitsOfMeasurement["SiemensOnMeter"] = 7] = "SiemensOnMeter";
    UnitsOfMeasurement[UnitsOfMeasurement["MetersPerSecond"] = 8] = "MetersPerSecond";
    UnitsOfMeasurement[UnitsOfMeasurement["Other"] = 9] = "Other";
})(UnitsOfMeasurement = exports.UnitsOfMeasurement || (exports.UnitsOfMeasurement = {}));
exports.lightSpeed = 3 * Math.pow(10, 8);
var Utilities = /** @class */ (function () {
    function Utilities() {
    }
    Utilities.valuesMap = new Map([
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
    return Utilities;
}());
exports.Utilities = Utilities;
