import React from "react";
import Image from "next/image";

type Props = {
  iconName: string;
};

const WeatherImage = ({ iconName }: Props) => {
  return (
    <div className="relative h-20 w-20">
      <Image
        width={100}
        height={100}
        alt="logo"
        className="absolute h-full w-full"
        src={`https://openweathermap.org/img/wn/${iconName}@4x.png`}
      />
    </div>
  );
};

export default WeatherImage;
