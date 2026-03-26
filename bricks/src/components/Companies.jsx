import React from "react";
import ama from "../assets/images/ama.png";
import spotify from "../assets/images/spotify.png";
import amd from "../assets/images/amd.png";
import logi from "../assets/images/logi.png";
import cisco from "../assets/images/cisco.png";
import drop from "../assets/images/drop.png";

function Companies() {
  return (
    <div className=" TrustedCompnaies-div py-5 text-center">
      <p className="text-white mb-5">
        Thousands of world's leading companies trust Space
      </p>

      <div className="container">
        <div className="row justify-content-center align-items-center">

          <div className="col-4 col-md-2">
            <img src={ama} className="img-fluid" />
          </div>

          <div className="col-4 col-md-2">
            <img src={amd} className="img-fluid" />
          </div>

          <div className="col-4 col-md-2">
            <img src={cisco} className="img-fluid" />
          </div>

          <div className="col-4 col-md-2">
            <img src={drop} className="img-fluid" />
          </div>

          <div className="col-4 col-md-2">
            <img src={logi}className="img-fluid" />
          </div>

          <div className="col-4 col-md-2">
            <img src={spotify} className="img-fluid" />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Companies;