"use client";

import Link from "next/link";
import Image from "next/image";

interface ExperienceCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
}

export default function ExperienceCard({
  id,
  title,
  location,
  price,
  image,
  description,
}: ExperienceCardProps) {
  return (
    <div className="bg-[#f0f0f0]  rounded-xl  overflow-hidden shadow-[0px_4px_12px_rgba(0,0,0,0.10)] hover:shadow-[0px_6px_18px_rgba(0,0,0,0.15)] transition-shadow duration-300 w-full lg:max-w-[280px]">

      <div className="relative w-full aspect-16/10">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-3">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-gray-900 text-base truncate">
            {title}
          </h3>
          <span className="text-[12px] font-lg bg-[#D6D6D6] text-black px-2 py-1 rounded-md">
            {location}
          </span>
        </div>

        <p className="text-gray-500 text-sm line-clamp-2 mb-3 leading-relaxed">
          {description}
        </p>

        <div className="flex justify-between items-center">

          <span className="text-gray-700 text-sm">
            From <span className="font-bold text-black text-base">₹{price}</span>
          </span>

          <Link href={`/experiences/${id}`}>
            <button className="bg-[#FFD643] cursor-pointer text-black px-3 py-1.5 rounded-md text-sm hover:bg-yellow-500 transition-colors">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
