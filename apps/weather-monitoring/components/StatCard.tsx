"use client";

import { Card, Metric, Text } from "@tremor/react";
import clsx from "clsx";

type Props = {
  title: string;
  metric: string | number;
  color?:
    | "indigo"
    | "teal"
    | "red"
    | "yellow"
    | "green"
    | "blue"
    | "purple"
    | "pink"
    | "orange"
    | "rose"
    | "sky"
    | "lime"
    | undefined;
};

function StatCard({ title, metric, color }: Props) {
  return (
    <Card
      decorationColor={color}
      decoration="top"
      className={clsx("p-4 border-t-4 rounded-lg shadow-md")}
    >
      <Text className="text-gray-600 font-semibold">{title}</Text>
      <Metric className="text-2xl font-bold mt-2 text-black">{metric}</Metric>
    </Card>
  );
}

export default StatCard;
