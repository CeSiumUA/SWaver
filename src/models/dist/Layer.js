"use strict";
exports.__esModule = true;
exports.LayerParameter = void 0;
var fifthlab_component_1 = require("../app/labs/fifth/fifthlab.component");
exports.LayerParameter = new Map([
    [fifthlab_component_1.IonosphereLayer.D, new Map([[fifthlab_component_1.DayTime.Day, { h: 50, zm: 40, Ner: 1000 }],
            [fifthlab_component_1.DayTime.Night, { h: NaN, zm: NaN, Ner: 0 }]])],
    [fifthlab_component_1.IonosphereLayer.E, new Map([[fifthlab_component_1.DayTime.Day, { h: 100, zm: 60, Ner: 50000 }],
            [fifthlab_component_1.DayTime.Night, { h: 100, zm: 60, Ner: 5000 }]])],
    [fifthlab_component_1.IonosphereLayer.F, new Map([[fifthlab_component_1.DayTime.Day, { h: 200, zm: 90, Ner: 1000000 }],
            [fifthlab_component_1.DayTime.Night, { h: 205, zm: 100, Ner: 250000 }]])],
    [fifthlab_component_1.IonosphereLayer.F1, new Map([[fifthlab_component_1.DayTime.Day, { h: 160, zm: 80, Ner: 250000 }],
            [fifthlab_component_1.DayTime.Night, { h: NaN, zm: NaN, Ner: 0 }]])],
    [fifthlab_component_1.IonosphereLayer.F2, new Map([[fifthlab_component_1.DayTime.Day, { h: 220, zm: 120, Ner: 500000 }],
            [fifthlab_component_1.DayTime.Night, { h: 200, zm: 100, Ner: 500000 }]])],
]);
