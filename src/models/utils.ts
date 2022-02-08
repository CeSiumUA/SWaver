export class Utils{
  public static roundValue(numm: number): number|string{
    const value = Math.round(numm * 1000) / 1000;
    if (value === 0){
      const a = 1 / numm;
      const decimals = Math.floor(Math.log10(a));
      return ((Math.round(numm * Math.pow(10, decimals) * 1000) / 1000.0) * Math.pow(10.0, -decimals));
    }
    return value;
  }
}
