"use client";
import React, { useState } from "react";
import { Country, City } from "country-state-city";
import Select from "react-select";
import { useRouter } from "next/navigation";
import Loading from "./Loading";

type option = {
  value: {
    latitude: string;
    longitude: string;
    isoCode: string;
  };
  label: string;
} | null;

type cityOption = {
  value: {
    latitude: string;
    longitude: string;
    countryCode: string;
    name: string;
    stateCode: string;
  };
  label: string;
} | null;

const options = Country.getAllCountries().map((country) => ({
  value: {
    latitude: country.latitude,
    longitude: country.longitude,
    isoCode: country.isoCode,
  },
  label: country.name,
}));

interface CitypickerProps {
  onCitySelect: (city: string) => void;
}

const Citypicker = () => {
  const [selectedCountry, setSelectedCountry] = useState<option>(null);
  const [selectedCity, setSelectedCity] = useState<cityOption>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  setTimeout(() => {
    setLoading(true);
  }, 2000);

  if (loading) {
    <Loading />;
  }

  const handleselectcountry = (option: option) => {
    setSelectedCountry(option);
    setSelectedCity(null);
  };

  const handleselectcity = (option: cityOption) => {
    setSelectedCity(option);
    // if (option) {
    //   onCitySelect(option.value.name); 
    // }
    router.push(
      `/location/${option?.value.name}/${option?.value.latitude}/${option?.value.longitude}`
    );
  };

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <div className="flex items-center ">
          <label htmlFor="country">Select Country</label>
        </div>
        <Select
          className="text-black"
          value={selectedCountry}
          onChange={handleselectcountry}
          options={options}
        />
      </div>

      {selectedCountry && loading && (
        <div className="space-y-1">
          <div className="flex items-center ">
            <label htmlFor="country">Select City</label>
          </div>
          <Select
            className="text-black"
            value={selectedCity}
            onChange={handleselectcity}
            options={City.getCitiesOfCountry(
              selectedCountry.value.isoCode
            )?.map((state) => ({
              value: {
                latitude: state.latitude!,
                longitude: state.longitude!,
                countryCode: state.countryCode,
                name: state.name,
                stateCode: state.stateCode,
              },
              label: state.name,
            }))}
          />
        </div>
      )}
    </div>
  );
};

export default Citypicker;
