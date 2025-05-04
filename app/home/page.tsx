"use client";

import { SectionBrands } from "@/components/home/section-brands";
import { HomeComponent } from "./_components/HomeComponent";
import { SectionServices } from "@/components/home/section-services";
import { SectionAboutUs } from "@/components/home/section-about-us";

export default function Page() {
  return (
    <div className="flex flex-col gap-12 lg:gap-28 mb-10">
      <HomeComponent />
      <SectionBrands />
      <SectionServices />
      <SectionAboutUs />
    </div>
  );
}
