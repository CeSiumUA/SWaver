"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SecondLabComponent = void 0;
var core_1 = require("@angular/core");
var values_1 = require("src/math/values");
var secondLabFormulas_1 = require("../../../math/secondLabFormulas");
var SecondLabComponent = /** @class */ (function () {
    function SecondLabComponent() {
        this.traceLength = 20;
        this.traceLengthMap = 'k';
        this.waveLength = 50;
        this.waveLengthMap = 'One';
        this.angle = 15;
        this.distanceToDiafragm = 18;
        this.distanceToDiafragmMap = 'k';
        this.directed = false;
        this.diafragmRadius = 1;
        this.zoneNumber = 1;
    }
    Object.defineProperty(SecondLabComponent.prototype, "valuesMap", {
        get: function () {
            var valsmap = Object.keys(values_1.MetricPrefixes)
                .filter(function (val) { return isNaN(Number(val)) === false; })
                .map(function (key) { return values_1.MetricPrefixes[Number(key)]; });
            return valsmap;
        },
        enumerable: false,
        configurable: true
    });
    SecondLabComponent.prototype.showValue = function (val) {
        return val.toString();
    };
    Object.defineProperty(SecondLabComponent.prototype, "FrenselZoneRadius", {
        get: function () {
            var traceLengthCoefficient = values_1.Utilities.valuesMap.get(this.valuesMap.indexOf(this.traceLengthMap));
            var realTracelength = this.traceLength * (traceLengthCoefficient ? traceLengthCoefficient : 1);
            var distanceCoefficient = values_1.Utilities.valuesMap.get(this.valuesMap.indexOf(this.distanceToDiafragmMap));
            var realDistance = this.distanceToDiafragm * (distanceCoefficient ? distanceCoefficient : 1);
            var waveLengthCoefficient = values_1.Utilities.valuesMap.get(this.valuesMap.indexOf(this.waveLengthMap));
            var realWaveLength = this.waveLength * (waveLengthCoefficient ? waveLengthCoefficient : 1);
            return secondLabFormulas_1.SecondLabCalculation.CalculateFrenselZoneRadius(realWaveLength, realTracelength, realDistance, this.zoneNumber);
        },
        enumerable: false,
        configurable: true
    });
    SecondLabComponent = __decorate([
        core_1.Component({
            selector: 'secondlab-app',
            templateUrl: './secondlab.component.html',
            styleUrls: ['./secondlab.component.css']
        })
    ], SecondLabComponent);
    return SecondLabComponent;
}());
exports.SecondLabComponent = SecondLabComponent;
