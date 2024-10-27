import React, { useState } from "react";
import Citypicker from "../components/Citypicker";
import { ConvertKtoC } from "./ConvertKtoC";
import Image from "next/image";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

type ForecastDay = {
  date: string;
  dt: string;
  temp_max: number;
  temp_min: number;
  weather: {
    icon: string;
    description: string;
  };
};

type Props = {
  city: string;
  lat: string;
  long: string;
  country: string;
  degree: number;
  weatherType: string;
  feels_like: number;
  weathercode: string;
  sunrise: string;
  sunset: string;
  date: string;
  currTime: string;
  month: string;
  cityselect: any;
  forecastData: ForecastDay[];
};

const Informationpanel = ({
  city,
  lat,
  long,
  country,
  degree,
  weatherType,
  feels_like,
  sunrise,
  sunset,
  date,
  weathercode,
  currTime,
  month,
  forecastData,
  cityselect,
}: Props) => {
  const temperature = ConvertKtoC(degree);
  const feelsLikeTemp = ConvertKtoC(feels_like);

  return (
    <div className="bg-gradient-to-br from-[#394F68] to-[#183B7E] p-6 space-y-4 lg:w-[50vh]">
      <div className="pb-4 text-white">
        <h1 className="text-5xl font-bold">
          {city}, {country}
        </h1>
        <p className="text-xs text-gray-400 font-semibold">
          lat/lon: {lat}, {long}
        </p>
      </div>

      <div>
        <Citypicker />
      </div>

      <div className="border mt-10 mb-5 border-gray-400" />

      <div className="mt-5 items-center justify-between flex">
        <div className="flex-1 items-center gap-1">
          <p className="text-xl font-sans">{date},</p>
          <p className="text-xl font-sans">{month}</p>
        </div>

        <p className="font-bold text-md uppercase">{currTime}</p>
      </div>

      <div className="border mt-10 mb-5 border-gray-400" />

      <div>
        <div className="justify-between flex my-6">
          <div>
            <p className="text-5xl font-bold text-white">{temperature}°C</p>
            <div className="my-6">
              <p className="text-md text-white">{weatherType}</p>
              <p className="text-md text-white">Feels like {feelsLikeTemp}°C</p>
            </div>
          </div>

          <Image
            width={20}
            height={20}
            alt="logo"
            className=" h-20 w-20"
            src={`https://openweathermap.org/img/wn/${weathercode}@4x.png`}
          />
        </div>

        {/* <---- Sunrise & sunset ----> */}
        <div className="space-y-2 ">
          <div className="border py-4 px-4 justify-between flex rounded-md border-[#6F90CD] bg-[#405885] items-center">
            <div className="flex gap-3 items-center">
              <SunIcon className="text-gray-400 h-8 w-8" />
              <p className="font-sans text-lg">Sunrise</p>
            </div>
            <p className="font-bold uppercase">{sunrise}</p>
          </div>

          <div className="border py-4 px-4 justify-between flex rounded-md border-[#6F90CD] bg-[#405885] items-center">
            <div className="flex gap-3 items-center">
              <MoonIcon className="text-gray-400 h-8 w-8" />
              <p className="font-sans text-lg">Sunset</p>
            </div>
            <p className="font-bold uppercase">{sunset}</p>
          </div>
        </div>
      </div>

      {/* 5 days forecast data */}
      <div className="top-10">
        <h1 className="font-sans text-xl font-bold">Days Forecast</h1>
        <div className="my-4 space-y-2">
          {forecastData.map((day, index) => (
            <div
              key={index}
              className=" flex border rounded-md justify-between items-center p-2 border-[#6F90CD] bg-[#405885]"
            >
              <p className="font-semibold">{day.date}</p>{" "}
              <div>
                <div className="flex flex-row items-center">
                  <Image
                    width={30}
                    height={30}
                    alt="Weather icon"
                    src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
                  />
                  <p>{day.weather.description}</p>
                </div>
                <div className="flex gap-2">
                  <p>
                    {day.temp_max}°C{" "}
                    <span className="text-green-500">&#9650;</span>
                  </p>
                  <p>
                    {day.temp_min}°C{" "}
                    <span className="text-red-500">&#9660;</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Informationpanel;
