import React from "react";
import { apiRequest } from "@/util/api";
import moment from "moment";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";
export default async function page() {
  let blogs = {};
  blogs = await apiRequest("/api/getAllBlogPosts", "POST");

  return (
    <div>
      <section className="page-title-section blog-header-bg text-center d-flex align-items-center justify-content-center">
        <div className='page-title-overlay'></div>
        <div className="container">
          <h1 className="text-white fw-bold">Blogs</h1>
        </div>
      </section>
      <div className="container my-5 blog-listing">
        <div className="row">
          {blogs?.data.map((item, index) => (
            <div key={index} className=" col-sm-6 col-12 col-md-6 col-lg-4 mt-3">
              <div className="item-single mb-30">
                <div className="position-relative">
                  <Image layout="responsive" className="image" src={item.thumbnail} height={300} width={413} alt={item.slug} />
                  <div className="blog-card-date text-center">
                    25<br/>Dec 2024
                  </div>
                </div>
                <div className=" gray-simple content">
                  <h4>
                    <a className="one-line-dot" href={`/blogs/${item.slug}`}>
                      {item.title}{" "}
                    </a>
                  </h4>
                  <p className="two-line-ellipsis">{item.meta_description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "The Ultimate Guide for Hajj and Umrah: A Complete Picture Guide to Every Step",
  description: "Explore expert Umrah & Hajj guides, travel tips, and spiritual insights for pilgrims. Your trusted resource for Islamic journeys to Makkah & Madinah.",
  keywords: "Umrah Blogs, Islamic Blogs, Islamic travel blogs, Travel tips, Hajj and Umrah travel guide, Umrah travel guide, Umrah travel tips, Hajj travel tips, Umrah guide, Muslim travel guide, Spiritual journeys for Muslims, Guide for Hajj and Umrah",
};