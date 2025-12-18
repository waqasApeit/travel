import dynamic from "next/dynamic";
import { Suspense } from "react";
// const ServicesForYou = dynamic(() => import('@/components/Home/ServicesForYou'));
// const SeeSaudia = dynamic(() => import('@/components/Home/SeeSaudia'));
const Search = dynamic(() => import("@/components/Home/Search/Search"));
const Package = dynamic(() => import("@/components/Home/Packages/Package"));
const TopHotels = dynamic(() =>
  import("@/components/Home/TopHotels/TopHotels")
);
// import { WhyChooseUs } from '@/components/Home/WhyChooseUs';

import SectionOne from "@/components/Home/SectionOne/SectionOne";
// import ListenHolyQuran from '@/components/Home/ListenHolyQuran/ListenHolyQuran';
import AboutUs from "@/components/Home/AboutUs/AboutUs";
import Services from "@/components/Home/Services/Services";
import IslamPillers from "@/components/Home/IslamPillers/IslamPillers";
import FollowUs from "@/components/Home/FollowUs/FollowUs";
import HajjCountdown from "@/components/Home/HajjCountDown/HajjCountdown";
import Video from "@/components/Home/TikTokVideo/Video";
import Easybook from "@/components/Home/Easybook/Easybook";
import EnquiryForm from "@/components/Home/EnquiryForm/EnquiryForm";
import LatestActivities from "@/components/LatestActivities/LatestActivities";
export default function Home() {
  return (
    <div>
      <Search />
      <Easybook />
      <TopHotels />
      <LatestActivities />
      {/* <SectionOne/> */}
      <AboutUs />
      {/* <Package/> */}
      <EnquiryForm />
      {/* <Services/> */}
      {/* <TopHotels/> */}
      {/* <IslamPillers/> */}
      {/* <HajjCountdown/> */}
      {/* <ListenHolyQuran/> */}
      {/* <Video/> */}
      {/* <FollowUs/> */}
      {/* <ServicesForYou/> */}
      {/* <WhyChooseUs/> */}
      {/* <SeeSaudia/> */}
    </div>
  );
}
