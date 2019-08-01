import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="footer-color">
        <div className="footer-color">
          <div className="container">
            <div className="col-md-12 p-1 text-center">
              <strong className="small text-white text-uppercase">
                <div className="footer-copyright text-center py-3">
                  © 2019 Copyright:
                  <a
                    href="https://robertmsoriano.com"
                    style={{ textDecoration: "none", color: "#efefef" }}
                  >
                    {" "}
                    Roberto Soriano
                  </a>
                </div>
              </strong>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
