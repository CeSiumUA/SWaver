"use strict";
exports.__esModule = true;
exports.FourthLabCalculation = void 0;
var FourthLabCalculation = /** @class */ (function () {
    function FourthLabCalculation() {
    }
    FourthLabCalculation.CalculateRelativeDielectricPerneabilityGrapg = function (points, delta, gradient) {
        var _this = this;
        if (delta === void 0) { delta = 5.78 * Math.pow(10, -4); }
        if (gradient === void 0) { gradient = -7.85 * Math.pow(10, -8); }
        var pointsCollection = points.map(function (pnt) {
            var pointOnGraph = {
                x: pnt,
                y: _this.CalculateRelativeDielectricPerneability(pnt, delta, gradient)
            };
            return pointOnGraph;
        });
        return pointsCollection;
    };
    FourthLabCalculation.CalculateRelativeDielectricPerneability = function (point, delta, gradient) {
        if (delta === void 0) { delta = 5.78 * Math.pow(10, -4); }
        if (gradient === void 0) { gradient = -7.85 * Math.pow(10, -8); }
        var exp = Math.exp(gradient * point / delta);
        return 1 + delta * exp;
    };
    FourthLabCalculation.CalculateDistanceGraph = function (points, angle, delta, gradient) {
        var _this = this;
        if (delta === void 0) { delta = 5.78 * Math.pow(10, -4); }
        if (gradient === void 0) { gradient = -7.85 * Math.pow(10, -8); }
        var pointsCollection = points.map(function (pnt) {
            var pointOnGraph = {
                y: pnt,
                x: _this.CalculateDistance(pnt, angle, delta, gradient)
            };
            return pointOnGraph;
        });
        console.log(pointsCollection);
        return pointsCollection;
    };
    FourthLabCalculation.CalculateDistance = function (point, angle, delta, gradient) {
        if (delta === void 0) { delta = 5.78 * Math.pow(10, -4); }
        if (gradient === void 0) { gradient = -7.85 * Math.pow(10, -8); }
        var angleRadians = (90 - angle) / (180 / Math.PI);
        var s = (point) /
            (Math.sqrt(1 -
                ((this.CalculateRelativeDielectricPerneability(0, delta, gradient) /
                    this.CalculateRelativeDielectricPerneability(point, delta, gradient))
                    * Math.pow(Math.sin(angleRadians), 2))));
        return Math.round(s / 1000);
    };
    return FourthLabCalculation;
}());
exports.FourthLabCalculation = FourthLabCalculation;
