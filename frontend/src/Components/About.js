import React from "react";
import developerImg from "./developerImg.jpg"
import linkedinLogo from "./linkedinLogo.png"
import gitLogo from "./gitLogo.png"

export default function About() {

  return (
    <div className="container my-3" id="aboutDiv">
      <h2>About Us</h2>
      <div className="accordion my-3" id="accordionExample">
        <div className="accordion-item" >
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <strong>What is iNotebook?</strong>
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show" 
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body ">
             iNoteBook is an on the go cloud note making utility, the backend is linked with MongoDB local database.
             Your Account and the Notes are secured to the teeth, with encrypted passwords using hashing and salts.
             It allows you add ,delete, update, fetch all your notes from your created account.  
            </div>
          </div>
        </div>

        <div className="accordion-item" >
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              <strong>Free To Use</strong>
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              This utility application freely available to use, Compatibe with diffrent screen sizes including your Smartphones.
            </div>
          </div>
        </div>

        <div className="accordion-item" >
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              <strong>Dark Mode</strong>
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              Along with your notes, you can also enjoy dark and light themes to suit your eyes in diffferent working environments.
            </div>
          </div>
        </div>

        <div className="accordion-item" >
          <h2 className="accordion-header" id="headingFour">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              <strong>About the developer</strong>
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="headingFour"
            data-bs-parent="#accordionExample"
          >
            < div className="accordion-body">
              
                <div className="d-flex flex-row mb-3 flex-wrap" >
                  <img src={developerImg} className="my-2 mx-2" style={{height:"10rem", width: "10rem",borderRadius:"50rem"}} alt="..." />
                  <div style={{display:"inline-block",width:"50rem"}}>
                    <h5 className="card-title">Deepak Singh | Web Developer | React Developer | Looking for opportunities</h5>
                    <p className="card-text ">Self taught front end developer who is able to realise projects from the ground up. I am well versed in the key languages and am able to design, code and deploy in an organised and efficient manner.<br/><br/>Aspiring to Efficient and creative front-end web developer catering to new and upcoming demands</p>
                  </div>
                </div>
                {/* <ul className="list-group list-group-flush">
                  <li className="list-group-item">An </li>
                  <li className="list-group-item">A second item</li>
                  <li className="list-group-item">A third item</li>
                </ul> */}
                <div>
                  <h4>For Source Code and Other Projects, Do Check My gitHub | Linkedin Profiles 
                  <a href="https://github.com/deepakbond058" className="card-link" target="_blank" rel="noreferrer"><img src={gitLogo}  alt="GitHub" style={{heigth:"5rem",width:"5rem"}} /></a>
                  <a href="https://linkedin.com/in/deepak-singh-20964b180"  className="card-link" target="_blank" rel="noreferrer"><img src={linkedinLogo} alt="Linkedin" style={{heigth:"5rem",width:"5rem"}}/></a>

                  </h4>
                </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
