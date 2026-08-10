import { GuardianEventBus } from '../../events/GuardianEventBus';

export class WeatherWatcher {
  constructor(private eventBus: GuardianEventBus) {}

  public checkWeather(location: {lat: number, lng: number}) {
    // Check weather APIs. Only notify Guardian if it impacts safety.
    const severeWeatherDetected = false; 
    if (severeWeatherDetected) {
      this.eventBus.publish({ type: 'WEATHER_CHANGED', payload: { condition: 'heavy_rain' }, timestamp: new Date() });
    }
  }
}
