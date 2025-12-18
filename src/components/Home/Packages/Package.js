import React from "react";
import PackageCategories from "./PackageCategories";
export default async function Package() {
  const categories = await FetchCategories();
  const firstCategory = categories[0];
  const initialPackages = firstCategory ? await FetchCategoryPackages(firstCategory.slug) : []

  return (
    <PackageCategories
      categories={categories}
      initialSlug={firstCategory?.slug}
      initialPackages={initialPackages}
    />
  );
}

async function FetchCategories() {

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/packages/categories`,
      {
        cache: "force-cache",          // cache forever (until deploy)
        next: { revalidate: 60  }, // revalidate every 30 minutes
        headers: { "ngrok-skip-browser-warning": "true" }
      }
    );

    const data = await res.json();
    return data?.Content?.categories || [];
  } catch (err) {
    console.error("Error fetching categories:", err);
    return [];
  }

}

async function FetchCategoryPackages(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/packages/search?category_slug=${slug}`,
      {
       cache: "no-store",
        // next: { revalidate: 60 },
        headers: { "ngrok-skip-browser-warning": "true" }
      }
    );

    const data = await res.json();
    // console.log("packages data First:", data);
    return data?.Content?.packages || [];
  } catch (err) {
    console.error("Error fetching packages for category:", err);
    return [];
  }

}