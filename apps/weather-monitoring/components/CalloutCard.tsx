"use client";

import { Callout } from "@tremor/react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";

type Props = {
  message: string;
  warnings?: boolean;
};

function CalloutCard({ message, warnings }: Props) {
  return (
    <Callout
      className={`mt-4 p-5 rounded-lg border shadow-sm text-sm  border-l-4 font-semibold justify-center ${
        warnings ? "bg-red-50 border-l-red-600 text-red-600" : "bg-green-50 border-l-green-600 text-green-800"
      }`}
      title={message}
      icon={warnings ? ExclamationCircleIcon : CheckCircleIcon}
    />
  );
}

export default CalloutCard;
