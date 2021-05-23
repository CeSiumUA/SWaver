"use strict";
exports.__esModule = true;
exports.FifthLabCalculation = void 0;
var FifthLabCalculation = /** @class */ (function () {
    function FifthLabCalculation() {
    }
    FifthLabCalculation.CalculateElectronsDensity = function (points, layer) {
        var _this = this;
        return points.map(function (pnt) {
            var point = {
                x: pnt,
                y: _this.GetHeightDensity(pnt, layer)
            };
            return point;
        });
    };
    FifthLabCalculation.GetHeightDensity = function (point, layer) {
        var density = layer.Ner * (((2 * (point - layer.h)) / layer.zm) -
            (Math.pow(point - layer.h, 2) / Math.pow(layer.zm, 2)));
        return Math.round(density);
    };
    FifthLabCalculation.CalculateTraceDistance = function (points, layer, angle, frequency) {
        var _this = this;
        var graphPoints = points.map(function (pnt) {
            var point = {
                x: pnt,
                y: _this.GetDistance(pnt, layer, angle, frequency)
            };
            return point;
        });
        return graphPoints;
    };
    FifthLabCalculation.GetDistance = function (point, layer, angle, frequency) {
        var electronsDensity = this.GetHeightDensity(point, layer);
        angle = (90 - angle) / (180 / Math.PI);
        var basicElectronsDensity = this.GetHeightDensity(layer.h, layer);
        var perneability = 1 - 80.8 * (electronsDensity / Math.pow(frequency, 2));
        var basicPerneability = 1 - 80.8 * (basicElectronsDensity / Math.pow(frequency, 2));
        var distance = point / Math.sqrt(1 - (basicPerneability / perneability) * Math.pow(Math.sin(angle), 2));
        return Math.round(distance);
    };
    return FifthLabCalculation;
}());
exports.FifthLabCalculation = FifthLabCalculation;
