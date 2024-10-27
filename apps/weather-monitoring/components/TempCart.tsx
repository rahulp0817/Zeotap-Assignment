import React from "react";
import { Card, AreaChart, Title } from "@tremor/react";

type TempData = {
  time: string;
  temperatureC: number;
};

type Props = {
  temperatureData: TempData[];
};

const dataFormatter = (number: number) => `${number}°C`;

const TempChart = ({ temperatureData }: Props) => {
  console.log("temperatureData:", temperatureData);
  return (
    <Card className="font-sans font-semibold p-4 shadow-md rounded-xl border ">
      <Title className="text-xl font-semibold text-gray-700 mb-4">
        Temperature Chart
      </Title>
      <AreaChart
        className="max-h-full text-yellow-400 "
        data={temperatureData}
        showLegend
        index="time"
        categories={["temperatureC"]}
        colors={["red"]}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
        showXAxis
      />
    </Card>
  );
};

export default TempChart;
