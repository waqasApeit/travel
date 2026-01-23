import React from "react";
import Detail from "./components/Detail";
import Map from "./components/Map";
import Form from "./components/Form";
import Faqs from "./components/Faqs";
import styles from "./ContactUs.module.css";
export default function page() {
  return (
    <>
      <div className="container contact-page mb-5 mt-5">
        <div className="row">
          <div className="col-lg-12 mt-4">
            <Detail />
          </div>
          <section className={styles.section}>
            <div className="container">
              <div className="row g-5">
                <div className="col-lg-6">
                  <Form />
                </div>

                <div className="col-lg-6">
                  <Faqs />
                </div>
              </div>
            </div>
          </section>
          <div className="col-lg-12">
            <Map />
          </div>
        </div>
      </div>
    </>
  );
}
