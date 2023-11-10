import React from "react";
import "./css/About.css";
export default function About() {
  return (
    <>
      <div className="container mt-4">
        <h1 className="mainHead">Welcome To Shopssy</h1>
        <hr
          style={{ border: "2px solid white", width: "50%", marginLeft: "25%" }}
        />
        <p className="paraAbout">
        At Shopssy, we are passionate about redefining your shopping experience through our innovative, budget-centric, and coupon-friendly shopping management app. Founded in 2023, our journey is fueled by a commitment to helping you make the most of your shopping budget while enjoying the convenience of a feature-packed application. We firmly believe that shopping should be a hassle-free and efficient process, and technology should be at the heart of it.
        </p>

        <h2>Our Mission</h2>
        <p className="textSize">
        Our mission at Shopssy is straightforward but impactful: to provide shoppers with a user-friendly platform that empowers them to manage their budgets efficiently and make the most out of their shopping experience. We strive to bridge the gap between traditional shopping approaches and modern, tech-driven solutions. Our dedication to affordability ensures that shoppers from all walks of life can access the tools they need to make informed purchasing decisions.
        </p>

        <h2>Why Choose Edusmartly?</h2>
        <p className="choosePoints">
          <span>&#9679;</span> Smart Budget Management
        </p>

        <p className="choosePoints">
          <span>&#9679;</span> Coupon Integration
        </p>


        <p className="choosePoints">
          <span>&#9679;</span> Passion for Shopping
        </p>

        <hr
          style={{ border: "2px solid white", width: "50%", marginLeft: "25%" }}
        />

        {/* code for adding the social media */}
        <div className="row d-flex justify-content-center">
          <i className="fa-brands fa-facebook brandStyle"></i>
          <i className="fa-brands fa-instagram brandStyle"></i>
          <i className="fa-brands fa-youtube brandStyle"></i>
        </div>
      </div>
    </>
  );
}
