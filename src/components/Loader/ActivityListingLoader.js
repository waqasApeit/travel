import React from 'react'

export default function ActivityListingLoader() {
    return (
        <div className="row g-4">
            {[...Array(6)].map((_, index) => (
                <div className='col-12 col-md-6 col-lg-4' key={index}>
                    <div className="card border-0 shadow-sm h-100">
                        {/* Image Placeholder */}
                        <div
                            className="bg-light placeholder-glow"
                            style={{ height: "220px" }}
                        >
                            <span className="placeholder col-12 h-100"></span>
                        </div>
                        
                        {/* Card Body */}
                        <div className="card-body p-3">
                            {/* Title */}
                            <div className="placeholder-glow mb-2">
                                <span className="placeholder col-8"></span>
                            </div>
                            
                            {/* Location */}
                            <div className="placeholder-glow mb-2">
                                <span className="placeholder col-6"></span>
                            </div>
                            
                            {/* Date */}
                            <div className="placeholder-glow mb-2">
                                <span className="placeholder col-5"></span>
                            </div>
                            
                            {/* Stars */}
                            <div className="placeholder-glow mb-2">
                                <span className="placeholder col-4"></span>
                            </div>
                            
                            {/* Description */}
                            <div className="placeholder-glow mb-3">
                                <span className="placeholder col-12"></span>
                                <span className="placeholder col-10"></span>
                            </div>
                            
                            {/* Footer */}
                            <div className="pt-3 border-top">
                                <div className="placeholder-glow mb-2">
                                    <span className="placeholder col-7"></span>
                                </div>
                                <div className="placeholder-glow">
                                    <button className="btn btn-secondary disabled placeholder col-12 rounded-pill"></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
