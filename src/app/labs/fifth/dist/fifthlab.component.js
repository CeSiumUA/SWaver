"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DayTime = exports.IonosphereLayer = exports.Season = exports.FifthlabComponent = void 0;
var core_1 = require("@angular/core");
var values_1 = require("src/math/values");
var FifthlabComponent = /** @class */ (function () {
    function FifthlabComponent() {
        this.frequency = 9.2;
        this.frequencyMap = 'M';
        this.angle = 30;
        this.selectedLayer = 'F';
        this.selectedDayTime = 'Day';
    }
    FifthlabComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(FifthlabComponent.prototype, "valuesMap", {
        get: function () {
            var valsmap = Object.keys(values_1.MetricPrefixes)
                .filter(function (val) { return isNaN(Number(val)) === false; })
                .map(function (key) { return values_1.MetricPrefixes[Number(key)]; });
            return valsmap;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FifthlabComponent.prototype, "IonospheresLayersValues", {
        get: function () {
            var layersmap = Object.keys(IonosphereLayer)
                .filter(function (val) { return isNaN(Number(val)) === false; })
                .map(function (key) { return IonosphereLayer[Number(key)]; });
            return layersmap;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FifthlabComponent.prototype, "DayTimeValues", {
        get: function () {
            var layersmap = Object.keys(DayTime)
                .filter(function (val) { return isNaN(Number(val)) === false; })
                .map(function (key) { return DayTime[Number(key)]; });
            return layersmap;
        },
        enumerable: false,
        configurable: true
    });
    FifthlabComponent.prototype.showValue = function (val) {
        return val.toString();
    };
    FifthlabComponent = __decorate([
        core_1.Component({
            selector: 'app-fifthlab',
            templateUrl: './fifthlab.component.html',
            styleUrls: ['./fifthlab.component.css']
        })
    ], FifthlabComponent);
    return FifthlabComponent;
}());
exports.FifthlabComponent = FifthlabComponent;
var Season;
(function (Season) {
    Season[Season["Winter"] = 0] = "Winter";
    Season[Season["Spring"] = 1] = "Spring";
    Season[Season["Summer"] = 2] = "Summer";
    Season[Season["Autumn"] = 3] = "Autumn";
})(Season = exports.Season || (exports.Season = {}));
var IonosphereLayer;
(function (IonosphereLayer) {
    IonosphereLayer[IonosphereLayer["D"] = 0] = "D";
    IonosphereLayer[IonosphereLayer["E"] = 1] = "E";
    IonosphereLayer[IonosphereLayer["F"] = 2] = "F";
    IonosphereLayer[IonosphereLayer["F1"] = 3] = "F1";
    IonosphereLayer[IonosphereLayer["F2"] = 4] = "F2";
})(IonosphereLayer = exports.IonosphereLayer || (exports.IonosphereLayer = {}));
var DayTime;
(function (DayTime) {
    DayTime[DayTime["Day"] = 0] = "Day";
    DayTime[DayTime["Night"] = 1] = "Night";
})(DayTime = exports.DayTime || (exports.DayTime = {}));
