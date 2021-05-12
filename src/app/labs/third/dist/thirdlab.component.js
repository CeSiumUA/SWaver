"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ThirdlabComponent = void 0;
var core_1 = require("@angular/core");
var values_1 = require("src/math/values");
var ThirdlabComponent = /** @class */ (function () {
    function ThirdlabComponent() {
        this.conductivity = 0.001;
        this.electricalPerneability = 25;
        this.waveLength = 20;
        this.waveLengthMap = 'One';
        this.transmitterHeight = 150;
        this.transmitterHeightMap = 'One';
        this.receiverHeight = 150;
        this.receiverHeightMap = 'One';
        this.directionalPatternWidth = 90;
        this.traceLength = 1;
        this.traceLengthMap = 'k';
        this.horizontalPolarization = true;
    }
    Object.defineProperty(ThirdlabComponent.prototype, "valuesMap", {
        get: function () {
            var valsmap = Object.keys(values_1.MetricPrefixes)
                .filter(function (val) { return isNaN(Number(val)) === false; })
                .map(function (key) { return values_1.MetricPrefixes[Number(key)]; });
            return valsmap;
        },
        enumerable: false,
        configurable: true
    });
    ThirdlabComponent.prototype.showValue = function (val) {
        return val.toString();
    };
    ThirdlabComponent.prototype.ngOnInit = function () {
    };
    ThirdlabComponent = __decorate([
        core_1.Component({
            selector: 'app-thirdlab',
            templateUrl: './thirdlab.component.html',
            styleUrls: ['./thirdlab.component.css']
        })
    ], ThirdlabComponent);
    return ThirdlabComponent;
}());
exports.ThirdlabComponent = ThirdlabComponent;
