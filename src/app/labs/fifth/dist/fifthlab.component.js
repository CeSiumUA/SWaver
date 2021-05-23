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
        this._frequency = 9.2;
        this._frequencyMap = 'M';
        this._angle = 30;
        this._selectedLayer = 'F';
        this._selectedDayTime = 'Day';
        this.traectoryGraphConfig = {
            type: 'line',
            data: {
                labels: this.TraceChartPoints.map(function (pnt) { return pnt.x; }),
                datasets: [{
                        label: 'Залежність висоти від пройденої відстані',
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
                                return "\u0412\u0438\u0441\u043E\u0442\u0430: " + a.raw;
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
                        label: 'Залежність електронної щільності від висоти',
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
                                return "\u0415\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u0430 \u0449\u0456\u043B\u044C\u043D\u0456\u0441\u0442\u044C: " + a.raw;
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
    Object.defineProperty(FifthlabComponent.prototype, "selectedLayer", {
        get: function () {
            return this._selectedLayer;
        },
        set: function (value) {
            this._selectedLayer = value;
            this.UpdateCharts();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FifthlabComponent.prototype, "selectedDayTime", {
        get: function () {
            return this._selectedDayTime;
        },
        set: function (value) {
            this._selectedDayTime = value;
            this.UpdateCharts();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FifthlabComponent.prototype, "frequency", {
        get: function () {
            return this._frequency;
        },
        set: function (value) {
            this._frequency = value;
            this.UpdateCharts();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FifthlabComponent.prototype, "frequencyMap", {
        get: function () {
            return this._frequencyMap;
        },
        set: function (value) {
            this._frequencyMap = value;
            this.UpdateCharts();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FifthlabComponent.prototype, "angle", {
        get: function () {
            return this._angle;
        },
        set: function (value) {
            this._angle = value;
            this.UpdateCharts();
        },
        enumerable: false,
        configurable: true
    });
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
            var layer = this.GetLayer();
            var points = this.GetHeightPoints(layer);
            var frequencyCoefficient = values_1.Utilities.valuesMap.get(this.valuesMap.indexOf(this.frequencyMap));
            var realFrequency = this.frequency * (frequencyCoefficient ? frequencyCoefficient : 1);
            return fifthLabFormulas_1.FifthLabCalculation.CalculateTraceDistance(points, layer, this.angle, realFrequency);
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
    FifthlabComponent.prototype.UpdateCharts = function () {
        var _a, _b;
        var trajectoryChartPoints = this.TraceChartPoints;
        this.traectoryGraphConfig.data.labels = trajectoryChartPoints.map(function (pnt) { return pnt.x; });
        this.traectoryGraphConfig.data.datasets[0].data = trajectoryChartPoints.map(function (pnt) { return pnt.y; });
        (_a = this.firstChart) === null || _a === void 0 ? void 0 : _a.update();
        var densityChartPoints = this.DensityChartPoints;
        this.densityGraphConfig.data.labels = densityChartPoints.map(function (pnt) { return pnt.x; });
        this.densityGraphConfig.data.datasets[0].data = densityChartPoints.map(function (pnt) { return pnt.y; });
        (_b = this === null || this === void 0 ? void 0 : this.secondChart) === null || _b === void 0 ? void 0 : _b.update();
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
