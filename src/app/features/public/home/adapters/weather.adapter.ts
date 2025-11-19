import { ZooWeather } from "../models/weather.model";
import { WEATHER_TRANSLATIONS } from "./weather-dictionary";

export const weatherAdapter = (apiResponse: any): ZooWeather => {
  const originalText = apiResponse.current.condition.text;

  const translatedText =
    WEATHER_TRANSLATIONS[originalText.trim().toLowerCase()] || originalText;

  const zooTips = getZooMessage(apiResponse.current.temp_c, translatedText);

  return {
    ...apiResponse,
    current: {
      ...apiResponse.current,
      condition: {
        ...apiResponse.current.condition,
        text: translatedText,
      },
    },
    ui: {
      message: zooTips.message,
      messageType: zooTips.type,
    },
  };
};

export const getZooMessage = (
  temp: number,
  conditionText: string,
): { message: string; type: "good" | "warning" | "info" } => {
  const textLower = conditionText.toLowerCase();

  if (
    textLower.includes("lluvia") ||
    textLower.includes("tormenta") ||
    textLower.includes("llovizna")
  ) {
    return {
      message:
        "¡Día de aventuras bajo techo! Visita el Reptilario y el Acuario hoy.",
      type: "info",
    };
  }

  if (temp >= 30) {
    return {
      message:
        "Hace calor. Mantente hidratado y visita a los Pingüinos para refrescarte.",
      type: "warning",
    };
  }

  if (temp <= 10) {
    return {
      message: "¡Qué frío! Los Osos Polares están muy activos. ¡Abrígate bien!",
      type: "info",
    };
  }

  return {
    message:
      "¡El clima es perfecto! Es un gran día para recorrer todo el zoológico.",
    type: "good",
  };
};
