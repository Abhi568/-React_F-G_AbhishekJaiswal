import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import refreshImage from "./../Images/refershImage.png";
import { useState, useEffect } from "react";
import "./HeadOfPage.css"

export default function HeadOfPage(props) {
  let [q, setQ] = useState("");
  let [originalData, setOriginalData] = useState([]);
  let navigate = useNavigate();
  const addNew = () => {
    navigate("/");
  };

  const settingUptheOrignalData = () => {
    originalData = JSON.parse(localStorage.getItem("form"));
    setOriginalData(originalData);
  };

  useEffect(() => {
    settingUptheOrignalData();
  }, []);

  const searchByEmailID = (event) => {
    // I have although set the query state (q) but not getting the exact value from that 
    // that's why I am using getElementById to get the actual entered value in seach box
    setQ(event.target.value);
    if (document.getElementById("search").value !== null) {
      settingUptheOrignalData();
      let results = originalData;
      let filteredData = results.filter((ele) => {
        return ele.custEmailId.startsWith(
          document.getElementById("search").value
        );
      });
      window.dispatchEvent(
        new CustomEvent("s", {
          detail: {
            filteredData: filteredData,
            originalData: originalData
          },
        })
      );
    }
  };

  return (
    <div className="head-of-page bg-light">
        <small className="navbar-brand fs-5 fw-bold">{props.headName}</small>
        <div style={{visibility: props.isVisible ? "visible":"hidden"}} >
          <form role="search" className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search by EmailID"
              aria-label="Search"
              value={q}
              id="search"
              onChange={searchByEmailID}
            />
            <div
              className="mx-2 refersh-button"
            >
              <img
                src={refreshImage}
                alt="refreshImage"
                style={{ width: "2.5rem", height: "2.5rem" }}
              />
            </div>

            <button className="btn btn-success add-btn" onClick={addNew}>
              Add New
            </button>
          </form>
        </div>
      </div>
    // </div>
  );
}

HeadOfPage.propTypes = {
  headName: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
};
HeadOfPage.defaultProps = {
  headName: "Aromatic bar",
  isVisible: false,
};
