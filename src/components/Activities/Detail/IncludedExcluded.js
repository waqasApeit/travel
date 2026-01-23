import React from 'react'
import { Philosopher } from "next/font/google";
const philosopher = Philosopher({
  subsets: ["latin"],
  weight: "700",
});
export default function IncludedExcluded({ included, excluded }) {
    return (
        <div>
            <section id="includeexclude" className="mb-5 mt-4 bg-muted rounded p-3">
                <div className="row">
                    <div className="col-md-6">
                        <h5 className={`mb-0 ${philosopher.className}`}>Included</h5>
                        <p className='small text-muted'>What is Included in the Experience</p>
                        <div dangerouslySetInnerHTML={{ __html: included }} />
                    </div>
                    <div className="col-md-6">
                        <h5 className={`mb-0 ${philosopher.className}`}>Excluded</h5>
                        <p className='small text-muted'>What is Not Included in the Experience</p>
                        <div dangerouslySetInnerHTML={{ __html: excluded }} />
                    </div>
                </div>
            </section>
        </div>
    )
}
