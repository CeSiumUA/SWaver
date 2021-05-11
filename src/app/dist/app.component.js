"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var chart_js_1 = require("chart.js");
var AppComponent = /** @class */ (function () {
    function AppComponent(httpClient, baseUrl) {
        this.httpClient = httpClient;
        this.baseUrl = '';
        this.points = [];
        chart_js_1.Chart.register.apply(chart_js_1.Chart, chart_js_1.registerables);
        this.baseUrl = baseUrl;
    }
    Object.defineProperty(AppComponent.prototype, "labels", {
        get: function () {
            var pointsCollection = this.points.map(function (pnt) { return (Math.round(pnt.x * 10) / 10).toString(); });
            return pointsCollection;
        },
        enumerable: false,
        configurable: true
    });
    AppComponent.prototype.drawGraph = function () {
        var config = {
            type: 'line',
            data: {
                labels: this.labels,
                datasets: [{
                        label: 'Результуючий графік',
                        backgroundColor: 'rgb(255, 90, 132)',
                        borderColor: 'rgb(255, 90, 132)',
                        data: this.points.map(function (pnt) { return pnt.y; })
                    }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };
        var context = document.getElementById('testCanvas').getContext('2d');
        if (context) {
            var myChart = new chart_js_1.Chart(context, config);
        }
    };
    AppComponent.prototype.ngOnInit = function () {
        /* this.httpClient.get(`${this.baseUrl}thirdlabcalculation/getgraphdata`)
          .subscribe((result) => {
            this.points = result as GraphPoint[];
            this.drawGraph();
          }); */
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        }),
        __param(1, core_1.Inject('BASE_URL'))
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
