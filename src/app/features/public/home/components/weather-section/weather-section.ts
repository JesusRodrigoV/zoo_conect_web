import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FetchWeather } from "../../services/fetch-weather";
import {
  AsyncPipe,
  DecimalPipe,
  DatePipe,
  NgOptimizedImage,
} from "@angular/common";
import { ZooHours } from "../../services/zoo-hours";

@Component({
  selector: "app-weather-section",
  imports: [AsyncPipe, DecimalPipe, DatePipe, NgOptimizedImage],
  templateUrl: "./weather-section.html",
  styleUrl: "./weather-section.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherSection {
  weatherService = inject(FetchWeather);
  private zooHours = inject(ZooHours);

  $weather = this.weatherService.getWeather("La Paz");
  today = new Date();

  zooStatus = this.zooHours.getStatus();
}
