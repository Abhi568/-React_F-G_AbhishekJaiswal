import React, { useState } from "react";
import HeadOfPage from "./HeadOfPage";
import { useEffect } from "react";
import "./FeedBackTable.css";

export default function FeedBackTable() {
  let [data, setData] = useState([]);
  let [deletingKeyList,setDeletingKeyList] = useState([]) ;
  let [original_data, setOriginalData] = useState([]);
  let [countOfcheckItems, setcountOfcheckItems] = useState(0);

  useEffect(() => {
    let completeData = JSON.parse(localStorage.getItem("form"));
    setData(completeData);
  }, []);

  window.addEventListener("s", function (evt) {
    original_data = evt.detail.originalData;
    setOriginalData(original_data);
    if (
      JSON.stringify(evt.detail.filteredData) ===
      JSON.stringify(evt.detail.originalData)
    ) {
      original_data = [];
    }
    setData(evt.detail.filteredData);
  });

  const selectTheData = (key) => {
    let inputBox = document.getElementsByClassName(
      `flexCheckCheckedDisabled${key}`
    );
    if (inputBox[0].checked) {
      deletingKeyList.push(key);
      setcountOfcheckItems(countOfcheckItems=>countOfcheckItems+1)
    } else {
      let index = deletingKeyList.indexOf(key);
      deletingKeyList.splice(index, 1);
      setcountOfcheckItems(countOfcheckItems=>countOfcheckItems-1)
    }
    let allCheckbox = document.getElementById("selectAllCheckbox");
    if (allCheckbox.checked) {
      if (deletingKeyList.length === 0) {
        allCheckbox.checked = false;
      }
    }
  };

  const deleteTheSelectedData = () => {
    if (countOfcheckItems>0){
    let completeData = original_data.length > 0 ? original_data : data;
    deletingKeyList.forEach((keyOfDeletingObj, index) => {
      completeData = completeData.filter((reviewObj) => {
        if (reviewObj["id"] === keyOfDeletingObj) {
          let checkBox = document.getElementsByClassName(
            `flexCheckCheckedDisabled${reviewObj.id}`
          );
          checkBox[0].checked = false;
        }
        return reviewObj["id"] !== keyOfDeletingObj;
      });
    });
    completeData.forEach((obj, index) => {
      obj["id"] = index + 1;
    });
    setData(completeData);
    setDeletingKeyList([])
    setcountOfcheckItems(0)
    let allCheckbox = document.getElementById("selectAllCheckbox");
    allCheckbox.checked = false
    localStorage.setItem("form", JSON.stringify(completeData));
  }
  };

  const selectAllTheData = () => {
    let allCheckbox = document.getElementById("selectAllCheckbox");
    if (allCheckbox.checked === false) {
      allCheckbox.checked = false;
      data.forEach((element) => {
        let checkBox = document.getElementsByClassName(
          `flexCheckCheckedDisabled${element.id}`
        );
        checkBox[0].checked = false;
      });
      setcountOfcheckItems(0)
      setDeletingKeyList([])
    } else {
      setcountOfcheckItems(0)
      allCheckbox.checked = true;
      data.forEach((element) => {
        setcountOfcheckItems(countOfcheckItems => countOfcheckItems+1)
        deletingKeyList.push(element.id)
        setDeletingKeyList(deletingKeyList)
        let checkBox = document.getElementsByClassName(
          `flexCheckCheckedDisabled${element.id}`
        );
        checkBox[0].checked = true;
      });
    }
  };

  return (
    <div style={{ backgroundColor: "#ebebeb"}} className="py-3 px-3">
      <HeadOfPage isVisible={true} />
      <div className="info-container my-3">
        <p className="py-3 px-2 fs-5 fw-semibold">{data.length} records found {countOfcheckItems} filter applied</p>
      </div>
      <div className="table-container px-2 py-2">
      <div className="table-responsive text-nowrap text-center">
        <table className="table table-bordered" >
          <thead className="heading-col">
            <tr>
              <th>
                <div className="form-check from-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="selectAllCheckbox"
                    onClick={selectAllTheData}
                  />
                </div>
              </th>
              <th>Form details</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">
                Please rate the quality of the services you received from your
                host
              </th>
              <th scope="col">Please rate the quality of your beverage</th>
              <th scope="col"> Was our restaurant clean?</th>
              <th scope="col">Please rate your overall dining experience</th>
            </tr>
          </thead>
          <tbody
            className="table-group-divider fw-semibold"
          >
            {data &&
              data.map((ele) => {
                return (
                  <tr key={ele.id}>
                    <th>
                      <div className="form-check">
                        <input
                          onClick={() => selectTheData(ele.id)}
                          className={`form-check-input flexCheckCheckedDisabled${ele.id}`}
                          type="checkbox"
                          value=""
                          htmlFor="flexCheckIndeterminate"
                        />
                      </div>
                    </th>
                    <td className="text-info">
                      View details
                    </td>
                    <td>{ele.custName}</td>
                    <td>{ele.custEmailId}</td>
                    <td>{ele.number.phoneNumber}</td>
                    <td>{ele.serviceOfHost}</td>
                    <td>{ele.qualityOfBeverage}</td>
                    <td>{ele.isRestClean}</td>
                    <td>{ele.overAllDining}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      </div>
      <div className="d-flex justify-content-end my-2">
        <button className="btn btn-danger" onClick={deleteTheSelectedData}>
          Delete
        </button>
      </div>
    </div>
  );
}
