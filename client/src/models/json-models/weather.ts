
export interface Weather {
  city: City;
  list: Array<ForecastSnapshot>
}

export interface City {
  id: number;
  name: string;
}

export interface ForecastSnapshot {
  //epoch time
  dt: number
  main: {
    temp: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    sea_level: number,
    grnd_level: number,
    humidity: number,
    temp_kf: number
  }
}

export interface MainWeatherInfo {

}
