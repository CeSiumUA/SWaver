export class FirstLabCalculation{
    public static CalculateEfficiency(linearAttenuation: number, length: number, swr: number): number{
        const A = Math.pow(10, (-1 * (linearAttenuation * length / 10)));
        const nu = A * (1 - Math.pow(((swr - 1) / (swr + 1)), 2));
        return nu;
    }

    public static CalculateEfficiencyFunction(linearAttenuation: number, swr: number): string{
      const numerator1 = (1 - Math.pow((swr - 1)/(swr + 1), 2))
      const numerator2 = -0.1 * linearAttenuation;
      return `${numerator1} * 10^(${numerator2} * x)`
    }
    public static CalculateRange(transmittingPower: number,
                                 transmitterDirectionalFactor: number,
                                 receiverDirectionalFactor: number,
                                 transmitterEfficiency: number,
                                 receiverEfficiency: number,
                                 waveLength: number,
                                 receiverSensitivity: number): number{
                                     const powerTranslate = Math.pow(10, ((receiverSensitivity / 10) - 3));
                                     const numerator = transmittingPower *
                                      transmitterDirectionalFactor * receiverDirectionalFactor * receiverEfficiency * transmitterEfficiency;
                                     const maxRange = (waveLength / (4 * Math.PI)) * Math.sqrt(numerator / powerTranslate);
                                     return maxRange;
    }
    public static CalculateEffectiveReceiverSquare(waveLength: number, receiverDirectionalFactor: number): number{
        const square = (Math.pow(waveLength, 2) / (4 * Math.PI)) * receiverDirectionalFactor;
        return square;
    }
    public static CalculateReceiverInputPower(transmittingPower: number,
                                              transmitterDirectionalFactor: number,
                                              receiverDirectionalFactor: number,
                                              transmitterEfficiency: number,
                                              receiverEfficiency: number,
                                              waveLength: number,
                                              transmittingRange: number): number{
                                                const numerator = transmittingPower *
                                                    transmitterDirectionalFactor *
                                                    receiverDirectionalFactor *
                                                    receiverEfficiency *
                                                    transmitterEfficiency *
                                                    Math.pow(waveLength, 2);
                                                const denominator = Math.pow((4 * Math.PI * transmittingRange), 2);
                                                const receiverPower = numerator / denominator;
                                                return receiverPower;
    }
  public static CalculateReceiverInputPowerFunction(transmittingPower: number,
                                                    transmitterDirectionalFactor: number,
                                                    receiverDirectionalFactor: number,
                                                    transmitterEfficiency: number,
                                                    receiverEfficiency: number,
                                                    waveLength: number): string{
    const numerator = transmittingPower *
      transmitterDirectionalFactor *
      receiverDirectionalFactor *
      receiverEfficiency *
      transmitterEfficiency *
      Math.pow(waveLength, 2);
    return `${numerator}/((4*3.14*x)^2)`;
  }
    public static CalculateMinimalInputSensivity(receiverPower: number): number{
        const sensivity = 10 * Math.log10(receiverPower) + 30;
        return sensivity;
    }
}
