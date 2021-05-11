"use strict";
exports.__esModule = true;
exports.FirstLabCalculation = void 0;
var FirstLabCalculation = /** @class */ (function () {
    function FirstLabCalculation() {
    }
    FirstLabCalculation.CalculateEfficiency = function (linearAttenuation, length, swr) {
        var A = Math.pow(10, (-1 * (linearAttenuation * length / 10)));
        var nu = A * (1 - Math.pow(((swr - 1) / (swr + 1)), 2));
        return nu;
    };
    FirstLabCalculation.CalculateRange = function (transmittingPower, transmitterDirectionalFactor, receiverDirectionalFactor, transmitterEfficiency, receiverEfficiency, waveLength, receiverSensitivity) {
        var powerTranslate = Math.pow(10, ((receiverSensitivity / 10) - 3));
        var numerator = transmittingPower *
            transmitterDirectionalFactor * receiverDirectionalFactor * receiverEfficiency * transmitterEfficiency;
        var maxRange = (waveLength / (4 * Math.PI)) * Math.sqrt(numerator / powerTranslate);
        return maxRange;
    };
    FirstLabCalculation.CalculateEffectiveReceiverSquare = function (waveLength, receiverDirectionalFactor) {
        var square = (Math.pow(waveLength, 2) / (4 * Math.PI)) * receiverDirectionalFactor;
        return square;
    };
    FirstLabCalculation.CalculateReceiverInputPower = function (transmittingPower, transmitterDirectionalFactor, receiverDirectionalFactor, transmitterEfficiency, receiverEfficiency, waveLength, transmittingRange) {
        var numerator = transmittingPower *
            transmitterDirectionalFactor *
            receiverDirectionalFactor *
            receiverEfficiency *
            transmitterEfficiency *
            Math.pow(waveLength, 2);
        var denominator = Math.pow((4 * Math.PI * transmittingRange), 2);
        var receiverPower = numerator / denominator;
        return receiverPower;
    };
    FirstLabCalculation.CalculateMinimalInputSensivity = function (receiverPower) {
        var sensivity = 10 * Math.log10(receiverPower) + 30;
        return sensivity;
    };
    return FirstLabCalculation;
}());
exports.FirstLabCalculation = FirstLabCalculation;
