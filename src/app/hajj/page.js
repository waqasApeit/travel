import React from "react";
import styles from "./HajjPage.module.css";
import Form from "./components/Form";
import UnderstandingHajj from "./components/UnderstandingHajj";
import PrepareJourney from "./components/PrepareJourney";
export default function page() {
  return (
    <div className={`min-vh-100  ${styles.hajj}`}>
      {/* Hero */}
      <section className={`py-5 text-center ${styles.hero}`}>
        <div className={styles.overLay}></div>
        <div className={`container ${styles.box}`}>
          <h2 className="display-5 fw-bold text-white mb-4">
            The Sacred Journey of Hajj 2026
          </h2>
          <p className="lead text-white mb-3">
            "And proclaim to mankind the Hajj pilgrimage. They will come to you
            on foot and on every lean camel; they will come from every distant
            pass."
          </p>
          <div className="text-warning">- Quran 22:27</div>
        </div>
      </section>
      {/* Interest Form */}
      <section id="prepare" className="py-5">
        <div className={styles.svgbg}>
          <div className="container">
            <UnderstandingHajj />
          </div>
        </div>
        <div className="container mt-5">
          <h3 className="h3 fw-bold text-center mb-4">Express Your Interest</h3>
          <p className="text-center text-muted mb-4">
            Ready to embark on this sacred journey? Let us help you prepare for
            Hajj 2026.
          </p>

          <div className="card shadow-sm mx-auto" style={{ maxWidth: "50em" }}>
            <div className="card-body">
              <h5 className="card-title">Hajj 2026 Registration</h5>
              <p className="card-text text-muted">
                Fill out this form and our team will contact you with details.
              </p>
              <Form />
            </div>
          </div>
          <PrepareJourney />
        </div>
      </section>
    </div>
  );
}
