import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import contactPageImage from "../../../static/assets/images/auth/login.jpg"

export default function () {
    return (
        <div className="contact-page-wrapper">
            <div className="left-column" 
            style={{
                backgroundImage: `url(${contactPageImage})`
            }}
            />

            <div className="right-column">
                <div className="contact-bullet-points">
                    <div className="bullet-point-group">
                        <div className="icon">
                            <FontAwesomeIcon icon="phone"/>
                        </div>
                        <div className="text">
                            555-555-4545
                        </div>

                    </div>

                    <div className="bullet-point-group">
                        <div className="icon">
                            <FontAwesomeIcon icon="envelope"/>
                        </div>
                        <div className="text">
                            alex@icloud.com
                        </div>

                    </div>
            
                    <div className="bullet-point-group">
                        <div className="icon">
                            <FontAwesomeIcon icon="map-marked-alt"/>
                        </div>
                        <div className="text">
                            Los Angeles, CA
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}