import React from "react";
import Detail from "./components/Detail";
import Map from "./components/Map";
import Form from "./components/Form";
import { FaAngleRight } from "react-icons/fa";
export default function page() {
  return (
    <div>
      <section className="page-title-section contact-bg-page text-center d-flex align-items-center justify-content-center">
        <div className="page-title-overlay"></div>
        <div className="container">
          <h1 className="text-white fw-bold">Contact Us</h1>
          <p>
            Home <FaAngleRight /> Contact us
          </p>
        </div>
      </section>
      <div className="container contact-page mb-5 mt-5">
        <div className="row">
           <div className="col-lg-12 mt-4">
            <Detail />
          </div>
          <div className="col-lg-5 mt-3">
           
             <Map />
          </div>
          <div className="col-lg-7 mt-3">
            <Form />
          </div>
         
        </div>
      </div>
    </div>
  );
}
