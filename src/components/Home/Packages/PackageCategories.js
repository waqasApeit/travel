"use client";
import { useState } from "react";
import PackageSlider from "./PackageSlider";
import { Loader } from "@mantine/core";


export default function PackageCategories({
  categories,
  initialSlug,
  initialPackages,
}) {
  const [activeSlug, setActiveSlug] = useState(initialSlug);
  const [packagesList, setPackagesList] = useState(initialPackages);
  const [loading, setLoading] = useState(false);

  const handleCategoryClick = async (slug) => {
    setActiveSlug(slug);
    setLoading(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/packages/search?category_slug=${slug}`,
      {
          headers: {
              // 'ngrok-skip-browser-warning': 'true',
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
      }
    );

    const data = await res.json();
    setPackagesList(data?.Content?.packages || []);
    setLoading(false);
  };

  return (
 
    <>
       <div className="gray-simple home-package-section">
        <div className="section-gap">
           <h5 className="text-center text-muted mb-2 fw-bold text-success">
            Packages
          </h5>
          <p className="text-center fs-4 fw-bold">Explore Our Packages</p>
            <div className="my-5">
                <div className="navTabbs d-flex align-items-center justify-content-center w-100 mt-5 mb-2">
                    <ul className="nav nav-pills gap-2 lights medium justify-content-center mb-3" id="searchTabs" role="tablist">
                        {categories.map((item, index) => (
                            <li key={index} className="nav-item mt-1" role="presentation">
                                <button
                                    className={`nav-link ${activeSlug === item.slug ? "active" : ""}`}
                                    onClick={() => handleCategoryClick(item.slug)}
                                    id={`tab-${item.id}`}
                                    data-bs-toggle="tab"
                                    data-bs-target={`#tab-pane-${item.id}`}
                                    type="button"
                                    role="tab"
                                    aria-controls={`tab-pane-${item.id}`}
                                    aria-selected="true"
                                >
                                    {item.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '30em' }}>
                     <Loader color="blue" size='lg' type="dots" />
                </div>
            ):(
            <div className="container">
                <PackageSlider packages={packagesList} />
            </div>
            )}

        </div>
    </div>
   
    </>
  );
}
