import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "./add-contract.css";
import "react-datepicker/dist/react-datepicker.css";
import { Statuses, ContractTypes } from "./constants/constants";
import "react-datepicker/dist/react-datepicker.css";
import AlertContext from "../../../common/providers/AlertContext";

const AddContract = () => {
  const navigate = useNavigate();
  const { getSuccessToast, getErrorToast } = useContext(AlertContext);
  const [startDate, setStartDate] = useState(new Date());

  const [contractData, setContractData] = useState({
    customerName: "",
    contactNumber: "",
    address: "",
    contractType: "",
    startDate: "",
    budget: 0,
  });

  const handleContractChanges = (e) => {
    e.preventDefault();

    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    const newContractData = { ...contractData };
    newContractData[fieldName] = fieldValue;

    if (!newContractData.contractType) {
      newContractData.contractType = "Reimbursement";
    }

    setContractData(newContractData);
  };

  const buttonClick = (e) => {
    e.preventDefault();
    const newContractData = { ...contractData };
    newContractData.startDate = startDate.toLocaleDateString("en-US");
    // console.log("Date picked: ", startDate.toLocaleDateString("en-US"));
    console.log("Submit Contract data: \n", newContractData);
  };

  const checkEnum = (e) => {
    e.preventDefault();
    // console.log(typeof Statuses.IN_PROGRESS);
    // console.log(JSON.stringify(getRequestObject()));
  };

  const getRequestObject = () => {
    return contractData.contractType === ContractTypes.REIMBURSEMENT
      ? {
          contractStatus: Statuses.READY,
          customer: {
            name: contractData.customerName,
            contactNumber: contractData.contactNumber,
          },
          address: contractData.address,
          contractType: contractData.contractType,
          startDate: startDate.toLocaleDateString("en-US"),
          budget: contractData.budget,
          milestones: [],
        }
      : {
          contractStatus: Statuses.READY,
          customer: {
            name: contractData.customerName,
            contactNumber: contractData.contactNumber,
          },
          budget: contractData.budget,
          address: contractData.address,
          contractType: contractData.contractType,
          startDate: startDate.toLocaleDateString("en-US"),
          milestones: [],
        };
  };

  const addContractData = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(getRequestObject()),
    };

    fetch(
      process.env.REACT_APP_BASE_URL +
        "/contracts/" +
        contractData.contractType,
      requestOptions
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong");
      })
      .then((responseJson) => {
        console.log("Response form the API call: ", responseJson);
        setContractData({
          customerName: "",
          contactNumber: "",
          address: "",
          contractType: "",
          startDate: "",
          budget: 0,
        });
        getSuccessToast("Contract added successfully");
      })
      .catch((error) => {
        console.log(error);
        getErrorToast("Error, could not add Contract!");
      });

    navigate("/contract");
  };

  return (
    <div className="addContract">
      <div className="mainContainer">
        <form style={{ display: "flex", flexDirection: "column" }}>
          <h1> Add new contract </h1>
          <div>
            <label> Customer Name: </label>
            <input
              type="text"
              placeholder="Enter name"
              name="customerName"
              value={contractData.customerName}
              onChange={handleContractChanges}
            />
          </div>
          <div>
            <label> Customer contact number: </label>
            <input
              type="text"
              required
              placeholder="contact number"
              name="contactNumber"
              value={contractData.contactNumber}
              onChange={handleContractChanges}
            />
          </div>
          <div>
            <label> Address: </label>
            <textarea
              required
              placeholder="Address"
              name="address"
              value={contractData.address}
              onChange={handleContractChanges}
            />
          </div>
          <div>
            <label> Contract Type</label>
            <select
              name="contractType"
              onChange={handleContractChanges}
              defaultValue={"Reimbursement"}
            >
              <option value="Fixed">Fixed-price contract</option>
              <option value="Reimbursement">Cost-reimbursement contract</option>
            </select>
          </div>
          {contractData.contractType === "Fixed" ? (
            <div>
              <label> Approx. Budget: </label>
              <input
                required
                placeholder="Budget"
                name="budget"
                value={contractData.budget}
                onChange={handleContractChanges}
              />
            </div>
          ) : (
            <div></div>
          )}
          <div>
            <label>Start date</label>
            <DatePicker
              selected={startDate}
              name="startDate"
              onChange={(date) => {
                setStartDate(date);
              }}
              dateFormat="dd/MM/yyyy"
            />
          </div>
          {/* <button onClick={buttonClick}> Submit </button> */}
          <button onClick={addContractData}> Submit </button>
          {/* <button onClick={checkEnum}> Submit </button> */}
        </form>
      </div>
    </div>
  );
};

export default AddContract;
