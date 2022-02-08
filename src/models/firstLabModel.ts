import {ConvertableValue} from './convertableValue';
import {GraphPoint} from './GraphPoint';

export interface FirstLabModel{
  isDistanceSetMode: boolean;
  frequency: ConvertableValue;
  transmitterPower: ConvertableValue;
  transmitterDirectionalFactor: number;
  transmitterSWR: number;
  receiverDirectionalFactor: number;
  receiverSWR: number;
  transmitterLinearAttenuation: number;
  transmitterAntennaLength: ConvertableValue;
  receiverLinearAttenuation: number;
  receiverAntennaLength: ConvertableValue;
  distance?: ConvertableValue;
  receiverSensitivity?: number;
  graphPoints: GraphPoint[];
}
