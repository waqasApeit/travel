import dynamic from "next/dynamic";
const Search = dynamic(() => import("@/components/Home/Search/Search"));
const TopHotels = dynamic(() => import("@/components/Home/TopHotels/TopHotels"));
import AboutUs from "@/components/Home/AboutUs/AboutUs";
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
      <AboutUs />
      <EnquiryForm />
    </div>
  );
}
