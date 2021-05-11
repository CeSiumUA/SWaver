"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FirstLabComponent = void 0;
var core_1 = require("@angular/core");
var values_1 = require("../../../math/values");
var firstLabFormulas_1 = require("../../../math/firstLabFormulas");
var FirstLabComponent = /** @class */ (function () {
    function FirstLabComponent() {
        this.isDistanceSetMode = true;
        this.frequency = 50;
        this.frequencyMap = 'M';
        this.transmitterPower = 10;
        this.transmitterPowerMap = 'One';
        this.transmitterDirectionalFactor = 3;
        this.transmitterSWR = 1.2;
        this.receiverDirectionalFactor = 6;
        this.receiverSWR = 1.5;
        this.transmitterLinearAttenuation = 0.01;
        this.transmitterAntennaLength = 25;
        this.transmitterAntennaLengthMap = 'One';
        this.receiverLinearAttenuation = 0.02;
        this.receiverAntennaLength = 20;
        this.receiverAntennaLengthMap = 'One';
        this.distance = 10;
        this.distanceMap = 'k';
        this.receiverSensitivity = -40;
    }
    Object.defineProperty(FirstLabComponent.prototype, "calcSetMode", {
        get: function () {
            return this.isDistanceSetMode ? 'Задання відстані' : 'Задання чутливості приймача';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FirstLabComponent.prototype, "valuesMap", {
        get: function () {
            var valsmap = Object.keys(values_1.MetricPrefixes)
                .filter(function (val) { return isNaN(Number(val)) === false; })
                .map(function (key) { return values_1.MetricPrefixes[Number(key)]; });
            return valsmap;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FirstLabComponent.prototype, "ReceiverInputPower", {
        get: function () {
            var frequencyCoefficient = values_1.Utilities.valuesMap.get(this.valuesMap.indexOf(this.frequencyMap));
            var realFrequency = this.frequency * (frequencyCoefficient ? frequencyCoefficient : 1);
            var waveLength = values_1.lightSpeed / realFrequency;
            var powerCoefficient = values_1.Utilities.valuesMap.get(this.valuesMap.indexOf(this.transmitterPowerMap));
            var realTransmitterPower = this.transmitterPower * (powerCoefficient ? powerCoefficient : 1);
            var transmittingRangeCoefficient = values_1.Utilities.valuesMap.get(this.valuesMap.indexOf(this.distanceMap));
            var realRange = this.distance * (transmittingRangeCoefficient ? transmittingRangeCoefficient : 1);
            return firstLabFormulas_1.FirstLabCalculation.CalculateReceiverInputPower(realTransmitterPower, this.transmitterDirectionalFactor, this.receiverDirectionalFactor, this.TransmitterEfficiency, this.ReceiverEfficiency, waveLength, realRange);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FirstLabComponent.prototype, "TransmitterEfficiency", {
        get: function () {
            var prefix = this.valuesMap.indexOf(this.transmitterAntennaLengthMap);
            var lengthValueCoefficient = values_1.Utilities.valuesMap.get(prefix);
            var realLengthValue = this.transmitterAntennaLength * (lengthValueCoefficient ? lengthValueCoefficient : 1);
            return firstLabFormulas_1.FirstLabCalculation.CalculateEfficiency(this.transmitterLinearAttenuation, realLengthValue, this.transmitterSWR);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FirstLabComponent.prototype, "EffectiveReceiverSquare", {
        get: function () {
            var frequencyCoefficient = values_1.Utilities.valuesMap.get(this.valuesMap.indexOf(this.frequencyMap));
            var realFrequency = this.frequency * (frequencyCoefficient ? frequencyCoefficient : 1);
            var waveLength = values_1.lightSpeed / realFrequency;
            return firstLabFormulas_1.FirstLabCalculation.CalculateEffectiveReceiverSquare(waveLength, this.receiverDirectionalFactor);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FirstLabComponent.prototype, "ReceiverEfficiency", {
        get: function () {
            var prefix = this.valuesMap.indexOf(this.receiverAntennaLengthMap);
            var lengthValueCoefficient = values_1.Utilities.valuesMap.get(prefix);
            var realLengthValue = this.receiverAntennaLength * (lengthValueCoefficient ? lengthValueCoefficient : 1);
            return firstLabFormulas_1.FirstLabCalculation.CalculateEfficiency(this.receiverLinearAttenuation, realLengthValue, this.receiverSWR);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FirstLabComponent.prototype, "MaxTransmissionRange", {
        get: function () {
            var powerCoefficient = values_1.Utilities.valuesMap.get(this.valuesMap.indexOf(this.transmitterPowerMap));
            var realTransmitterPower = this.transmitterPower * (powerCoefficient ? powerCoefficient : 1);
            var frequencyCoefficient = values_1.Utilities.valuesMap.get(this.valuesMap.indexOf(this.frequencyMap));
            var realFrequency = this.frequency * (frequencyCoefficient ? frequencyCoefficient : 1);
            var waveLength = values_1.lightSpeed / realFrequency;
            return firstLabFormulas_1.FirstLabCalculation.CalculateRange(realTransmitterPower, this.transmitterDirectionalFactor, this.receiverDirectionalFactor, this.TransmitterEfficiency, this.ReceiverEfficiency, waveLength, this.receiverSensitivity);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FirstLabComponent.prototype, "ReceiverMinimalSensivity", {
        get: function () {
            return firstLabFormulas_1.FirstLabCalculation.CalculateMinimalInputSensivity(this.ReceiverInputPower);
        },
        enumerable: false,
        configurable: true
    });
    FirstLabComponent.prototype.showValue = function (val) {
        return val.toString();
    };
    FirstLabComponent.prototype.ngOnInit = function () {
    };
    FirstLabComponent = __decorate([
        core_1.Component({
            selector: 'firstlab-app',
            templateUrl: './firstlab.component.html',
            styleUrls: ['./firstlab.component.css']
        })
    ], FirstLabComponent);
    return FirstLabComponent;
}());
exports.FirstLabComponent = FirstLabComponent;
