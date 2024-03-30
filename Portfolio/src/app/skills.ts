export class Skills {

  static getOptions() {
    return {
      percent: 0,
      radius: 59,
      outerStrokeWidth: 15,
      innerStrokeWidth: 15,
      space: -15,
      outerStrokeColor: "#4882c2",
      innerStrokeColor: "rgba(255, 255, 255, 0.1)",
      subtitleColor: "white",
      subtitleFontSize: "25",
      subtitleFontWeight: "900",
      showBackground: false,
      animateTitle: false,
      showUnits: false,
      showTitle: false,
      clockwise: false,
      animationDuration: 1000,
      startFromZero: true,
      outerStrokeGradient: true,
      outerStrokeGradientStopColor: '#53a9ff',
      lazy: true,
      subtitleFormat: (percent: number): string => {
        return `${percent}%`;
      }
    }
  }

}
