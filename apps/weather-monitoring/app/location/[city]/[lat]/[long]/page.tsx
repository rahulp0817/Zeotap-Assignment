"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@tremor/react";
import { useQuery } from "react-query";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { ConvertKtoC } from "../../../../../components/ConvertKtoC";
import Loading from "../../../../../components/Loading";
import StatCard from "../../../../../components/StatCard";
import CalloutCard from "../../../../../components/CalloutCard";
import Informationpanel from "../../../../../components/Informationpanel";
import WeatherImage from "../../../../../components/WeatherImage";
import TempChart from "../../../../../components/TempCart";

// data type
interface WeatherResponse {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherData[];
  city: City;
}

interface WeatherData {
  dt: number;
  main: MainWeather;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: Sys;
  dt_txt: string;
}

interface MainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Sys {
  pod: string;
}

interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

interface Coord {
  lat: number;
  lon: number;
}

const Home = () => {
  const [citySelect, setCitySelect] = useState("siberia");
  const { isLoading, error, data } = useQuery(
    ["repoData", citySelect],
    async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${citySelect}&appid=${NEXT_API}&cnt=56`
      );
      return data;
    },
    { enabled: !!citySelect }
  );

  if (isLoading) return <Loading />;

  const firstData = data?.list[0];
  const secondData = data?.list[1];
  const city = data?.city;
  const formatVisibility = (visibility: number) =>
    (visibility / 1000).toFixed(1);

  // chart temperature
  const temperatureData = data.list.map((item: any) => ({
    time: format(parseISO(item.dt_txt), "HH:mm"),
    temperatureC: ConvertKtoC(item.main.temp),
  }));

  // Filter to get 5-day forecast data
  const fiveDayForecast = data?.list
    .filter((_: any, index: any) => index % 8 === 0)
    .slice(0, 5)
    .map((dayData: any) => ({
      date: format(parseISO(dayData?.dt_txt ?? ""), "EEEE"),
      temp_max: ConvertKtoC(dayData.main.temp_max),
      temp_min: ConvertKtoC(dayData.main.temp_min),
      weather: {
        icon: dayData.weather[0].icon,
        description: dayData.weather[0].main,
      },
    }));

  return (
    <main className="flex flex-col min-h-screen lg:flex-row">
      {/* Api call function */}

      {/* sidebar */}
      <Informationpanel
        city={city.name}
        lat={city.coord.lat}
        long={city.coord.lon}
        country={city.country}
        degree={secondData?.main.temp}
        weatherType={secondData?.weather[0].description}
        feels_like={firstData?.main.feels_like}
        weathercode={secondData?.weather[0].icon}
        sunset={format(new Date(city.sunset * 1000), "h:mm a")}
        sunrise={format(new Date(city.sunrise * 1000), "h:mm a")}
        date={format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}
        currTime={format(parseISO(firstData?.dt_txt), "h:mm a")}
        month={format(parseISO(firstData?.dt_txt), "MMMM d, yyyy")}
        forecastData={fiveDayForecast}
        cityselect={citySelect}
      />
      <section className=" w-full space-y-6 p-6 md:overflow-x-hidden ">
        <div>
          <div className="flex justify-between mb-8">
            <h1 className="font-semibold text-black text-xl ">
              Todays Highlights
            </h1>
            <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold rounded-full px-4 py-2 flex items-center shadow-lg hover:from-purple-600 hover:to-purple-800 transition duration-200 ease-in-out transform hover:scale-105 cursor-pointer">
              <p className="font-sans">Current Location</p>
            </div>
          </div>

          {/* summary of forecast + store in db */}
          <CalloutCard message={"This where gpt will go!"} />

          {/* max and min temp */}
          <div className="flex space-x-6 mt-6">
            <StatCard
              title="Minimum Temperature "
              metric={`${ConvertKtoC(secondData.main.temp_min)}°C`}
              color="blue"
            />
            <StatCard
              title="Maximum Temperature "
              metric={`${ConvertKtoC(secondData.main.temp_max)}°C`}
              color="blue"
            />
          </div>

          {/* Alert temperature */}
          {ConvertKtoC(firstData?.main.temp) > 30 && (
            <CalloutCard
              message={
                "Temperature is more high today, wear sunglasses and SPF!"
              }
              warnings
            />
          )}

          {/* Alert Wind speed */}
          {firstData?.wind.speed > 20 && (
            <CalloutCard
              message={"Wind speed is high today, hold on to your hat!"}
              warnings
            />
          )}

          {/* Alert precipitation */}
          {firstData?.pop > 0 && (
            <CalloutCard
              message={
                "Severe Weather Alert! Thunderstorms with heavy rain are expected"
              }
              warnings
            />
          )}

          {/* Alert snowfall  */}
          {ConvertKtoC(firstData?.main.temp) < -4 && (
            <CalloutCard
              message={
                "Snow fall Alert! Temperatures are expected to drop below freezing, be prepared for snow and icy roads"
              }
              warnings
            />
          )}

          {/* Extra - Humidity, Wind, Speed */}
          <div className=" mt-6 grid grid-cols-1 xl:grid-cols-4 gap-5 md:grid-cols-2">
            <StatCard
              title="Humidity"
              metric={`${firstData?.main.humidity}%`}
              color="blue"
            />
            <StatCard
              title="Wind Speed"
              metric={
                firstData?.wind?.speed
                  ? `${(firstData?.wind.speed * 3.6).toFixed(2)} km/h`
                  : "Loading..."
              }
              color="blue"
            />
            <StatCard
              title="Air Pressure"
              metric={`${firstData?.main.pressure}hpa`}
              color="blue"
            />
            <StatCard
              title="Visibility"
              metric={`${formatVisibility(firstData?.visibility)}km`}
              color="blue"
            />
          </div>
        </div>

        {/* todays time wise temp */}
        <Card className="border flex gap-10 sm-gap-15 overflow-x-auto w-full justify-between pr-3 text-black rounded-t-xl shadow-md ">
          {data?.list.map((d: any, i: number) => (
            <div
              key={i}
              className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
            >
              <WeatherImage iconName={d?.weather[0].icon} />
              <p className="whitespace-nowrap">
                {format(parseISO(d.dt_txt), "h:mm a")}
              </p>
              <p>{ConvertKtoC(d?.main.temp ?? 0)}°C</p>
            </div>
          ))}
        </Card>

        {/* Chart trends */}

        <TempChart temperatureData={temperatureData} />
      </section>
    </main>
  );
};

export default Home;
