export interface OpenMeteoReponse {
  current_units: {
    temperature_2m: string;
  };

  current: {
    temperature_2m: number;
  };
}
