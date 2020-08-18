/* eslint-disable camelcase */
// export interface Todo {
//   id: string;
//   name: string;
// }

import { ImageSourcePropType } from "react-native";

// export interface WeatherFromApi {
//   name: string;
//   main: {
//     temp_max: number;
//     temp_min: number;
//     temp: number;
//   };
//   sys: {
//     sunrise: number;
//     sunset: number;
//     country: string;
//   };
//   weather: {
//     description: string;
//     icon: string
//   }[];
// }

// export interface Weather {
//   city: string;
//   tempMax: number;
//   tempMin:number;
//   temp: number;
//   sunrise: number;
//   sunset: number;
//   country: string;
//   description: string;
//   icon: string;
// }

// export interface Position {
//   coordinates: {
//     latitude: number;
//     longitude: number;
//   }
// }

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  deadline: number[];
  startDate: number[];
  category: string;
}

export interface TodoWithoutId {
  title: string;
  completed: boolean;
  deadline: number[];
  startDate: number[];
  category: string;
}

export interface Category {
  title: string;
  image: ImageSourcePropType;
  id: string
}

export interface Option {
  title: string;
  id: string;
}

