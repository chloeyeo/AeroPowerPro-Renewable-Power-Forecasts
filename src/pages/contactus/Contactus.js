import React from "react";
import { NavBar } from "../../components";
import "./contactus.css";

const Contactus = () => (
  <>
    <div>
      <NavBar />
    </div>
    <div className="maincontent" style={{ fontSize: 20 }}>
      Have an inquiry? Get in touch with us by completing the form:
    </div>
    <div className="maincontent">
      <form>
        <input
          type="text"
          name="name"
          style={{ backgroundColor: "#d9d9d9" }}
          placeholder="Name"
          id="small"
        />
        <input
          type="text"
          name="subject"
          style={{ backgroundColor: "#d9d9d9" }}
          placeholder="Subject"
          id="small"
        />
        <textarea
          rows={10}
          name="message"
          style={{ backgroundColor: "#d9d9d9" }}
          placeholder="Message"
          id="large"
        />
        <input
          type="submit"
          value="Submit"
          style={{ backgroundColor: "#d9d9d9", color: "#373B44" }}
        />
      </form>
    </div>
    <footer>
      <p id="email" style={{ fontSize: 20 }}>
        You can also get in contact with us at the following email address:
        sh33@outlook.com
      </p>
    </footer>
  </>
);
export default Contactus;
