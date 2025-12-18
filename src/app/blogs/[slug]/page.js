import { apiRequest } from "@/util/api";
import moment from "moment";

export async function generateMetadata({params}) {
  const { slug } =await params;
  const blogDetail = await apiRequest("/api/getSingleBlogPosts", "POST", { slug });

  return {
    title: blogDetail?.data?.seo_title|| "Blog",
    description: blogDetail?.data?.meta_description || "Read our blog post.",
    keywords: blogDetail?.data?.meta_keywords || "Umrah Blogs, Islamic Blogs, Hajj travel tips, Muslim travel guide",
  };
}

export default async function page({ params }) {
    let blogDetail={}
  const { slug } =await params;
   blogDetail = await apiRequest("/api/getSingleBlogPosts", "POST", { slug });
  return (
    <div>
      <section className="page-title-section blog-header-bg text-center d-flex align-items-center justify-content-center">
         <div className='page-title-overlay'></div>
        <div className="container">
          <h1 className="text-white fw-bold">{blogDetail.data.title}</h1>
          <p>{moment(blogDetail.data.created_at).format('LL')}</p>
        </div>
      </section>

      <div className="container my-5">
        {/* eslint-disable @next/next/no-img-element  */}
        <div className="blog-content " dangerouslySetInnerHTML={{ __html: blogDetail.data.content }} />
      </div>
    </div>
  );
}

