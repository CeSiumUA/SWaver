"use strict";
exports.__esModule = true;
exports.LayerParameter = exports.DayTime = exports.IonosphereLayer = exports.Season = void 0;
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
exports.LayerParameter = new Map([
    [IonosphereLayer.D, new Map([[DayTime.Day, { h: 50, zm: 40, Ner: 1000 }],
            [DayTime.Night, { h: NaN, zm: NaN, Ner: 0 }]])],
    [IonosphereLayer.E, new Map([[DayTime.Day, { h: 100, zm: 60, Ner: 50000 }],
            [DayTime.Night, { h: 100, zm: 60, Ner: 5000 }]])],
    [IonosphereLayer.F, new Map([[DayTime.Day, { h: 200, zm: 90, Ner: 1000000 }],
            [DayTime.Night, { h: 205, zm: 100, Ner: 250000 }]])],
    [IonosphereLayer.F1, new Map([[DayTime.Day, { h: 160, zm: 80, Ner: 250000 }],
            [DayTime.Night, { h: NaN, zm: NaN, Ner: 0 }]])],
    [IonosphereLayer.F2, new Map([[DayTime.Day, { h: 220, zm: 120, Ner: 500000 }],
            [DayTime.Night, { h: 200, zm: 100, Ner: 500000 }]])],
]);
