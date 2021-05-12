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
    return FourthLabCalculation;
}());
exports.FourthLabCalculation = FourthLabCalculation;
