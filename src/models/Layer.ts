
import { IonosphereLayer, DayTime } from '../app/labs/fifth/fifthlab.component';
export interface Layer{
    h: number;
    zm: number;
    Ner: number;
}

export const LayerParameter = new Map<IonosphereLayer, Map<DayTime, Layer>>([
    [IonosphereLayer.D, new Map<DayTime, Layer>([[DayTime.Day, {h: 50, zm: 40, Ner: 1000} as Layer],
                                                 [DayTime.Night, {h: NaN, zm: NaN, Ner: 0} as Layer]])],
    [IonosphereLayer.E, new Map<DayTime, Layer>([[DayTime.Day, {h: 100, zm: 60, Ner: 50000} as Layer],
                                                 [DayTime.Night, {h: 100, zm: 60, Ner: 5000} as Layer]])],
    [IonosphereLayer.F, new Map<DayTime, Layer>([[DayTime.Day, {h: 200, zm: 90, Ner: 1000000} as Layer],
                                                 [DayTime.Night, {h: 205, zm: 100, Ner: 250000} as Layer]])],
    [IonosphereLayer.F1, new Map<DayTime, Layer>([[DayTime.Day, {h: 160, zm: 80, Ner: 250000} as Layer],
                                                  [DayTime.Night, {h: NaN, zm: NaN, Ner: 0} as Layer]])],
    [IonosphereLayer.F2, new Map<DayTime, Layer>([[DayTime.Day, {h: 220, zm: 120, Ner: 500000} as Layer],
                                                  [DayTime.Night, {h: 200, zm: 100, Ner: 500000} as Layer]])],
]);
