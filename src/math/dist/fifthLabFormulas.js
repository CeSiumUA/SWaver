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
    return FifthLabCalculation;
}());
exports.FifthLabCalculation = FifthLabCalculation;
