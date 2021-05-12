"use strict";
exports.__esModule = true;
exports.SecondLabCalculation = void 0;
var SecondLabCalculation = /** @class */ (function () {
    function SecondLabCalculation() {
    }
    SecondLabCalculation.CalculateFrenselZoneRadius = function (waveLength, r, r1, n) {
        if (n === void 0) { n = 1; }
        var result = Math.sqrt((waveLength * r1 * (r - r1) * n) / (r));
        return result;
    };
    return SecondLabCalculation;
}());
exports.SecondLabCalculation = SecondLabCalculation;
