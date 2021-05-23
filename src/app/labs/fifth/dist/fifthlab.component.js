"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FifthlabComponent = void 0;
var core_1 = require("@angular/core");
var chart_js_1 = require("chart.js");
var values_1 = require("src/math/values");
var fifthLabFormulas_1 = require("../../../math/fifthLabFormulas");
var Layer_1 = require("../../../models/Layer");
var FifthlabComponent = /** @class */ (function () {
    function FifthlabComponent() {
        this.frequency = 9.2;
        this.frequencyMap = 'M';
        this.angle = 30;
        this.selectedLayer = 'F';
        this.selectedDayTime = 'Day';
        this.traectoryGraphConfig = {
            type: 'line',
            data: {
                labels: this.TraceChartPoints.map(function (pnt) { return pnt.x; }),
                datasets: [{
                        label: 'Залежність діелектричної проникності від висоти',
                        backgroundColor: 'rgb(255, 90, 132)',
                        borderColor: 'rgb(255, 90, 132)',
                        data: this.TraceChartPoints.map(function (pnt) { return pnt.y; })
                    }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false
                    }
                },
                plugins: {
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            label: function (a) {
                                return "\u0414\u0456\u0435\u043B\u0435\u043A\u0442\u0440\u0438\u0447\u043D\u0430 \u043F\u0440\u043E\u043D\u0438\u043A\u043D\u0456\u0441\u0442\u044C: " + a.raw;
                            }
                        }
                    }
                }
            }
        };
        this.densityGraphConfig = {
            type: 'line',
            data: {
                labels: this.DensityChartPoints.map(function (pnt) { return pnt.x; }),
                datasets: [{
                        label: 'Залежність пройденої відстані від висоти',
                        backgroundColor: 'rgb(255, 90, 132)',
                        borderColor: 'rgb(255, 90, 132)',
                        data: this.DensityChartPoints.map(function (pnt) { return pnt.y; })
                    }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            label: function (a) {
                                return "\u0412\u0438\u0441\u043E\u0442\u0430: " + a.raw;
                            }
                        }
                    }
                }
            }
        };
    }
    FifthlabComponent.prototype.ngOnInit = function () {
        var _a, _b, _c, _d;
        var context1 = (_a = document.getElementById('fifthCanvas1')) === null || _a === void 0 ? void 0 : _a.getContext('2d');
        var context2 = (_b = document.getElementById('fifthCanvas2')) === null || _b === void 0 ? void 0 : _b.getContext('2d');
        while (context1 === null || context2 === null) {
            context1 = (_c = document.getElementById('fifthCanvas1')) === null || _c === void 0 ? void 0 : _c.getContext('2d');
            context2 = (_d = document.getElementById('fifthCanvas2')) === null || _d === void 0 ? void 0 : _d.getContext('2d');
        }
        if (context1) {
            this.firstChart = new chart_js_1.Chart(context1, this.traectoryGraphConfig);
        }
        if (context2) {
            this.secondChart = new chart_js_1.Chart(context2, this.densityGraphConfig);
        }
    };
    Object.defineProperty(FifthlabComponent.prototype, "DensityChartPoints", {
        get: function () {
            var layer = this.GetLayer();
            var points = this.GetHeightPoints(layer);
            return fifthLabFormulas_1.FifthLabCalculation.CalculateElectronsDensity(points, layer);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FifthlabComponent.prototype, "TraceChartPoints", {
        get: function () {
            return [];
        },
        enumerable: false,
        configurable: true
    });
    FifthlabComponent.prototype.GetHeightPoints = function (layer) {
        var min = layer.h;
        var max = layer.h + 2 * layer.zm;
        var points = [];
        for (var i = min; i < max; i += 2) {
            points.push(i);
        }
        return points;
    };
    FifthlabComponent.prototype.GetLayer = function () {
        var layerLevel = Layer_1.IonosphereLayer[this.selectedLayer];
        var layerParameters = Layer_1.LayerParameter.get(layerLevel);
        var dayTime = Layer_1.DayTime[this.selectedDayTime];
        var layer = layerParameters === null || layerParameters === void 0 ? void 0 : layerParameters.get(dayTime);
        if (layer) {
            return layer;
        }
        return {};
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
            var layersmap = Object.keys(Layer_1.IonosphereLayer)
                .filter(function (val) { return isNaN(Number(val)) === false; })
                .map(function (key) { return Layer_1.IonosphereLayer[Number(key)]; });
            return layersmap;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FifthlabComponent.prototype, "DayTimeValues", {
        get: function () {
            var layersmap = Object.keys(Layer_1.DayTime)
                .filter(function (val) { return isNaN(Number(val)) === false; })
                .map(function (key) { return Layer_1.DayTime[Number(key)]; });
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
