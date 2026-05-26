import { useState, useEffect } from "react";
import {
  TruckIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";

export default function AutoTextSlide() {
  const textItems = [
    {
      icon: <TruckIcon className="w-6 h-6 text-yellow-300" />,
      text: "Fast Shipping",
    },
    {
      icon: <ShieldCheckIcon className="w-6 h-6 text-green-300" />,
      text: "Trusted Web 100%",
    },
    {
      icon: <CurrencyDollarIcon className="w-6 h-6 text-blue-300" />,
      text: "Free Delivery on 1500 PKR",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % textItems.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden bg-gray-900 text-white py-4 flex justify-center items-center h-11">
      <div className="flex items-center space-x-3 animate-slideUpDown text-lg font-semibold">
        {textItems[index].icon}
        <span>{textItems[index].text}</span>
      </div>
    </div>
  );
}
