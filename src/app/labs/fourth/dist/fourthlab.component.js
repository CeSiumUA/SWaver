"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FourthlabComponent = void 0;
var core_1 = require("@angular/core");
var chart_js_1 = require("chart.js");
var values_1 = require("src/math/values");
var fourthLabFormulas_1 = require("../../../math/fourthLabFormulas");
var FourthlabComponent = /** @class */ (function () {
    function FourthlabComponent() {
        this._horizontAngle = 0.4;
        this._delta = 2;
        this._graient = 4;
        this._userStandartParameters = true;
        this.perneabilityGraphConfig = {
            type: 'line',
            data: {
                labels: this.PerneabilityChartBounds,
                datasets: [{
                        label: 'Залежність діелектричної проникності від висоти',
                        backgroundColor: 'rgb(255, 90, 132)',
                        borderColor: 'rgb(255, 90, 132)',
                        data: this.PerneabilityChartPoints
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
        this.heightGraphConfig = {
            type: 'line',
            data: {
                labels: this.DistanceChartPoints,
                datasets: [{
                        label: 'Залежність пройденої відстані від висоти',
                        backgroundColor: 'rgb(255, 90, 132)',
                        borderColor: 'rgb(255, 90, 132)',
                        data: this.HeightChartBounds
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
    Object.defineProperty(FourthlabComponent.prototype, "userStandartParameters", {
        get: function () {
            return this._userStandartParameters;
        },
        set: function (value) {
            var _a, _b;
            this._userStandartParameters = value;
            this.perneabilityGraphConfig.data.datasets[0].data = this.PerneabilityChartPoints;
            this.heightGraphConfig.data.labels = this.DistanceChartPoints;
            this.heightGraphConfig.data.datasets[0].data = this.HeightChartBounds;
            (_a = this.secondChart) === null || _a === void 0 ? void 0 : _a.update();
            (_b = this.firstChart) === null || _b === void 0 ? void 0 : _b.update();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FourthlabComponent.prototype, "horizontAngle", {
        get: function () {
            return this._horizontAngle;
        },
        set: function (value) {
            var _a, _b;
            this._horizontAngle = value;
            this.perneabilityGraphConfig.data.datasets[0].data = this.PerneabilityChartPoints;
            this.heightGraphConfig.data.labels = this.DistanceChartPoints;
            this.heightGraphConfig.data.datasets[0].data = this.HeightChartBounds;
            (_a = this.secondChart) === null || _a === void 0 ? void 0 : _a.update();
            (_b = this.firstChart) === null || _b === void 0 ? void 0 : _b.update();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FourthlabComponent.prototype, "gradient", {
        get: function () {
            return this._graient;
        },
        set: function (value) {
            var _a, _b;
            this._graient = value;
            this.perneabilityGraphConfig.data.datasets[0].data = this.PerneabilityChartPoints;
            this.heightGraphConfig.data.labels = this.DistanceChartPoints;
            this.heightGraphConfig.data.datasets[0].data = this.HeightChartBounds;
            (_a = this.secondChart) === null || _a === void 0 ? void 0 : _a.update();
            (_b = this.firstChart) === null || _b === void 0 ? void 0 : _b.update();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FourthlabComponent.prototype, "delta", {
        get: function () {
            return this._delta;
        },
        set: function (value) {
            var _a, _b;
            this._delta = value;
            this.perneabilityGraphConfig.data.datasets[0].data = this.PerneabilityChartPoints;
            this.heightGraphConfig.data.labels = this.DistanceChartPoints;
            this.heightGraphConfig.data.datasets[0].data = this.HeightChartBounds;
            (_a = this.secondChart) === null || _a === void 0 ? void 0 : _a.update();
            (_b = this.firstChart) === null || _b === void 0 ? void 0 : _b.update();
        },
        enumerable: false,
        configurable: true
    });
    FourthlabComponent.prototype.ngOnInit = function () {
        var _a, _b, _c, _d;
        var context1 = (_a = document.getElementById('fourthCanvas1')) === null || _a === void 0 ? void 0 : _a.getContext('2d');
        var context2 = (_b = document.getElementById('fourthCanvas2')) === null || _b === void 0 ? void 0 : _b.getContext('2d');
        while (context1 === null || context2 === null) {
            context1 = (_c = document.getElementById('fourthCanvas1')) === null || _c === void 0 ? void 0 : _c.getContext('2d');
            context2 = (_d = document.getElementById('fourthCanvas2')) === null || _d === void 0 ? void 0 : _d.getContext('2d');
        }
        if (context1) {
            this.firstChart = new chart_js_1.Chart(context1, this.perneabilityGraphConfig);
        }
        if (context2) {
            this.secondChart = new chart_js_1.Chart(context2, this.heightGraphConfig);
        }
    };
    Object.defineProperty(FourthlabComponent.prototype, "valuesMap", {
        get: function () {
            var valsmap = Object.keys(values_1.MetricPrefixes)
                .filter(function (val) { return isNaN(Number(val)) === false; })
                .map(function (key) { return values_1.MetricPrefixes[Number(key)]; });
            return valsmap;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FourthlabComponent.prototype, "PerneabilityChartBounds", {
        get: function () {
            return [0, 100, 200,
                300, 400, 500,
                600, 700, 800,
                900, 1000, 1100,
                1200, 1300, 1400,
                1500, 1600, 1700,
                1800, 1900, 2000,
                2100, 2200, 2300,
                2400, 2500, 2600,
                2700, 2800, 2900,
                3000, 3100, 3200,
                3300, 3400, 3500,
                3600, 3700, 3800,
                3900, 4000, 4100,
                4200, 4300, 4400,
                4500, 4600, 4700,
                4800, 4900, 5000];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FourthlabComponent.prototype, "HeightChartBounds", {
        get: function () {
            var heights = [];
            for (var i = 0; i < 10000; i += 500) {
                heights.push(i);
            }
            return heights;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FourthlabComponent.prototype, "DistanceChartPoints", {
        get: function () {
            if (this.userStandartParameters) {
                return fourthLabFormulas_1.FourthLabCalculation.CalculateDistanceGraph(this.HeightChartBounds, this.horizontAngle).map(function (pnt) { return pnt.x; });
            }
            return fourthLabFormulas_1.FourthLabCalculation.CalculateDistanceGraph(this.HeightChartBounds, this.horizontAngle, this.delta * Math.pow(10, -4), (-1 * this.gradient * Math.pow(10, -8))).map(function (pnt) { return pnt.x; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FourthlabComponent.prototype, "PerneabilityChartPoints", {
        get: function () {
            if (this.userStandartParameters) {
                return fourthLabFormulas_1.FourthLabCalculation.CalculateRelativeDielectricPerneabilityGrapg(this.PerneabilityChartBounds).map(function (pnt) { return pnt.y; });
            }
            return fourthLabFormulas_1.FourthLabCalculation.CalculateRelativeDielectricPerneabilityGrapg(this.PerneabilityChartBounds, this.delta * Math.pow(10, -4), (-1 * this.gradient * Math.pow(10, -8))).map(function (pnt) { return pnt.y; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FourthlabComponent.prototype, "standartParameterToggleLabel", {
        get: function () {
            return this.userStandartParameters ? 'Нормальна' : 'Довільна';
        },
        enumerable: false,
        configurable: true
    });
    FourthlabComponent.prototype.showValue = function (val) {
        return val.toString();
    };
    FourthlabComponent = __decorate([
        core_1.Component({
            selector: 'app-fourthlab',
            templateUrl: './fourthlab.component.html',
            styleUrls: ['./fourthlab.component.css']
        })
    ], FourthlabComponent);
    return FourthlabComponent;
}());
exports.FourthlabComponent = FourthlabComponent;
