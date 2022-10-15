import React from "react";
import HeadOfPage from "./HeadOfPage";
import "./FeedBackForm.css";
import validator from "validator";
import { useState } from "react";
import tickFeedBackImage from "./../Images/tickFeedback.jpeg";
import { Toast } from "bootstrap";
import AlertMessage from "./AlertMessage";
import { useNavigate } from "react-router-dom"

export default function FeedBack() {
  const navigate = useNavigate();
  let localData = []
  const [form, setForm] = useState({
    custName: "",
    custEmailId: "",
    number: {
      countryCode: "+91",
      phoneNumber: "",
    },
    serviceOfHost: "",
    qualityOfBeverage: "",
    isRestClean: "",
    overAllDining: "",
    id: ""
  });

  // whether I have filled the value in inputs or not
  const [validation, setValidation] = useState({
    custName: false,
    custEmailId: false,
    phoneNumber: false,
  });

   // whether I have filled the valid value or not.
  const [validString, setValidString] = useState({
    forCustName: "",
    forCustEmailId: "",
    forPhoneNumber: "",
    forCheckboxes: "",
  });

  const [isThankYouPageVisible, setisThankYouPageVisible] = useState(false);

  const selectValue = (elementName) => {
    var ele = document.getElementsByName(`${elementName}`);
    for (let i = 0; i < ele.length; i++) {
      if (ele[i].checked) {
        form[elementName] = ele[i].value;
      }
    }
  };

  const enterPhoneNumber = (data, keyValue) => {
    validation[keyValue] = false;
    setValidation({ ...validation });
    if (
      keyValue === "countryCode" ||
      (keyValue === "phoneNumber" &&
        data.length < 11 &&
        data.match(/^[0-9\b]+$/)) ||
      data === ""
    ) {
      form["number"][keyValue] = data;
      setForm({...form});
    }
  };

  const fillTheDetails = (event, value) => {
    validation[value] = false;
    setValidation({ ...validation });
    form[value] = event;
    setForm({ ...form, [value]: form[value] });
  };

  const toastMessage = () => {
    const toastLiveExample = document.getElementById("liveToast");
    const toast = new Toast(toastLiveExample);
    toast.show();
  };

  const resetTheAllForm = () => {
    setisThankYouPageVisible(false);
    setForm({
      ...form,
      custName: "",
      custEmailId: "",
      number: {
        countryCode: "+91",
        phoneNumber: "",
      },
      serviceOfHost: "",
      qualityOfBeverage: "",
      isRestClean: "",
      overAllDining: "",
    });
    setValidation({
      ...validation,
      custName: false,
      custEmailId: false,
      phoneNumber: false,
    });
    setValidString({
      ...validString,
      forCustName: "",
      forCustEmailId: "",
      forPhoneNumber: "",
      forCheckboxes: "",
    });

    setisThankYouPageVisible(false);
  }

  const closeTheThanksPage = () => {
    resetTheAllForm()
    navigate("/feedbacktable")
  };

  const submitReview = () => {
    if (form.custName.length > 0) {
      if (form.custName.match(/^[a-zA-Z ]*$/) === null) {
        validation.custName = true;
        setValidation({ ...validation });
        validString.forCustName = "valid";
      } else {
        let trimedCustName = form.custName.replace(/ +/g, " ").trim();
        form.custName = trimedCustName;
        setForm({ ...form });
        validation.custName = false;
        setValidation({ ...validation });
        validString.forCustName = "";
      }
      setValidString({ ...validString });
    } else {
      validation.custName = true;
      setValidation({ ...validation });
      validString.forCustName = "";
      setValidString({ ...validString });
    }

    if (validator.isEmail(form.custEmailId) === false) {
      validation.custEmailId = true;
      setValidation({ ...validation });
      if (form.custEmailId.length > 0) {
        validString.forCustEmailId = "valid";
        setValidString({ ...validString });
      } else {
        validString.forCustEmailId = "";
        setValidString({ ...validString });
      }
    } else {
      validString.forCustEmailId = "";
      setValidString({ ...validString });
    }

    if (form.number.phoneNumber.length < 10) {
      validation.phoneNumber = true;
      setValidation({ ...validation });
      if (form.number.phoneNumber.length > 0) {
        validString.forPhoneNumber = "valid";
        setValidString({ ...validString });
      } else {
        validString.forPhoneNumber = "";
        setValidString({ ...validString });
      }
    } else {
      validString.forPhoneNumber = "";
      setValidString({ ...validString });
    }

    if (
      form.overAllDining.length === 0 ||
      form.serviceOfHost.length === 0 ||
      form.isRestClean.length === 0 ||
      form.qualityOfBeverage.length === 0
    ) {
      validString.forCheckboxes = "valid";
      setValidString({ ...validString });
    } else {
      validString.forCheckboxes = "";
      setValidString({ ...validString });
    }
    
    if (
      validString.forCheckboxes !== "valid" &&
      form.custName.length !== 0 &&
      validString.forCustName !== "valid" &&
      form.custEmailId.length !== 0 &&
      validString.forCustEmailId !== "valid" &&
      form.number.phoneNumber.length !== 0 &&
      validString.forPhoneNumber !== "valid"
    ) {
      setisThankYouPageVisible(true);

      if (localStorage.getItem("form") === null) {
        form['id'] = '1'
        localData.push(form)
        localStorage.setItem("form", JSON.stringify(localData));
      }
      else {
        let strigLocalData = localStorage.getItem("form")
        localData = JSON.parse(strigLocalData)
        form['id'] = localData.length + 1
        localData.push(form)
        localStorage.setItem("form", JSON.stringify(localData))
      }

    } else {
      if (
        validString.forCheckboxes === "valid" &&
        form.custName.length !== 0 &&
        form.custEmailId.length !== 0 &&
        form.number.phoneNumber.length !== 0
      ) {
        setisThankYouPageVisible(false);
        toastMessage();
      }
    }
  };
  return (
    <div className="main">
      {isThankYouPageVisible === true ? (
        <div id="feedback">
          <img
            src={tickFeedBackImage}
            alt="tickfeedbackImage"
            className="my-3 tickFeedback"
          />
          <p className="text-dark fs-4 fw-semibold">
            Thanks you for providing the feedback{" "}
          </p>
          <p className="text-secondary">
            We will work towards imporoving your experience
          </p>
          <div className="d-grid gap-2 col-1 mx-auto">
            <button
              type="button"
              className="btn text-light"
              id ="close-thankyou-page"
              onClick={closeTheThanksPage}
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <>
          <div style={{ backgroundColor: "#ebebeb" }} className="py-3 px-3 feedback-page">
            <HeadOfPage />
            <div className="my-3">
              <form className="needsValidation overflow-hidden" noValidate>
                <div
                  style={{
                    backgroundColor: "white",
                    paddingBottom: "4rem",
                  }}
                  className="px-4 pt-4"
                >
                  <div className="row asterisk-symbol">
                    <div className="col-md-6 height-of-col">
                      <label
                        className="form-label fw-bold fw-bold"
                      >
                        Customer name
                      </label>
                      <input
                        type="text"
                        placeholder="E.g. jon snow"
                        className="form-control"
                        onChange={(e) =>
                          fillTheDetails(e.target.value, "custName")
                        }
                        value={form.custName || ""}
                      />
                      {validation.custName && (
                        <AlertMessage validString={validString.forCustName} />
                      )}
                    </div>
                    <div className="col-md-6 height-of-col">
                      <label
                        className="form-label fw-bold"
                      >
                        Email
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="E.g. abc@gmail.com"
                        onChange={(e) =>
                          fillTheDetails(e.target.value, "custEmailId")
                        }
                        value={form.custEmailId || ""}
                      />
                      {validation.custEmailId && (
                        <AlertMessage
                          validString={validString.forCustEmailId}
                        />
                      )}
                    </div>
                    <div className="col-md-6 height-of-col">
                      <label
                        className="form-label fw-bold"
                      >
                        Phone
                      </label>
                      <div className="d-flex">
                        <div style={{width:"20%"}}>
                          <select
                            className="form-select select-country-code"
                            required
                            onChange={(e) =>
                              enterPhoneNumber(e.target.value, "countryCode")
                            }
                            value={form.number.countryCode}
                          >
                            <option defaultValue="+91">+91</option>
                            <option value="+64">+64</option>
                            <option value="+93">+93</option>
                            <option value="+355">+355</option>
                            <option value="+213">+213</option>
                            <option value="+1">+1</option>
                            <option value="+672">+672</option>
                          </select>
                        </div>
                        <div style={{width:"80%"}}  className="ms-2">
                          <input
                          placeholder="9999999999"
                            className="form-control"
                            onChange={(e) =>
                              enterPhoneNumber(e.target.value, "phoneNumber")
                            }
                            value={form.number.phoneNumber}
                            required
                          />
                        </div>
                      </div>
                      {validation.phoneNumber && (
                        <AlertMessage
                          validString={validString.forPhoneNumber}
                        />
                      )}
                    </div>
                  </div>
                  <div className="row g-4">
                    <div
                      className="col-md-6"
                      onClick={() => selectValue("serviceOfHost", "host")}
                    >
                      <label
                        className="form-label fw-bold asterisk-symbol"
                      >
                        Please rate the quality of the services you received
                        from your host.
                      </label>
                      <div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="serviceOfHost"
                            id="inlineRadio1"
                            value="Excellent"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio1"
                          >
                            Excellent
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="serviceOfHost"
                            id="inlineRadio2"
                            value="Good"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio2"
                          >
                            Good
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="serviceOfHost"
                            id="inlineRadio3"
                            value="Fair"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio3"
                          >
                            Fair
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="serviceOfHost"
                            id="inlineRadio3"
                            value="Bad"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio3"
                          >
                            Bad
                          </label>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-md-6 ps-4"
                      onClick={() => selectValue("qualityOfBeverage")}
                    >
                      <label
                        className="form-label fw-bold asterisk-symbol"
                      >
                        Please rate the quality of your beverage.
                      </label>
                      <div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="qualityOfBeverage"
                            id="inlineRadio1"
                            value="Excellent"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio1"
                          >
                            Excellent
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="qualityOfBeverage"
                            id="inlineRadio2"
                            value="Good"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio2"
                          >
                            Good
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="qualityOfBeverage"
                            id="inlineRadio3"
                            value="Fair"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio3"
                          >
                            Fair
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="qualityOfBeverage"
                            id="inlineRadio3"
                            value="Bad"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio3"
                          >
                            Bad
                          </label>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-md-6"
                      onClick={() => selectValue("isRestClean")}
                    >
                      <label
                        className="form-label fw-bold asterisk-symbol"
                      >
                        Was our restaurant clean?
                      </label>
                      <div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="isRestClean"
                            id="inlineRadio1"
                            value="Excellent"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio1"
                          >
                            Excellent
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="isRestClean"
                            id="inlineRadio2"
                            value="Good"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio2"
                          >
                            Good
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="isRestClean"
                            id="inlineRadio3"
                            value="Fair"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio3"
                          >
                            Fair
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="isRestClean"
                            id="inlineRadio3"
                            value="Bad"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio3"
                          >
                            Bad
                          </label>
                        </div>
                      </div>
                    </div>

                    <div
                      className="col-md-6 ps-4"
                      onClick={() => selectValue("overAllDining")}
                    >
                      <label
                        className="form-label fw-bold asterisk-symbol"
                      >
                        Please rate your overall dining experience.
                      </label>
                      <div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="overAllDining"
                            id="inlineRadio1"
                            value="Excellent"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio1"
                          >
                            Excellent
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="overAllDining"
                            id="inlineRadio2"
                            value="Good"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio2"
                          >
                            Good
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="overAllDining"
                            id="inlineRadio3"
                            value="Fair"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio3"
                          >
                            Fair
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="overAllDining"
                            id="inlineRadio3"
                            value="Bad"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio3"
                          >
                            Bad
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-12 d-flex justify-content-end p-2">
            <button
              className="btn btn-success"
              type="button"
              onClick={submitReview}
            >
              Submit Review
            </button>
          </div>
          <div className="toast-container position-fixed top-0 start-50 translate-middle-x p-3">
            <div
              id="liveToast"
              className="toast"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <AlertMessage alertMessage={"Please check all the CheckBoxes"} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
