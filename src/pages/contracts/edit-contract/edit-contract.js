import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./edit-contract.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AlertContext from "../../../common/providers/AlertContext";

const EditContract = () => {
  const [contractStatus, setContractStatus] = useState("ready");
  const navigate = useNavigate();
  const { state } = useLocation();
  const { getSuccessToast, getErrorToast } = useContext(AlertContext);
  const { contractId } = state;

  const [startDate, setStartDate] = useState(new Date());
  const [deliveryDate, setDeliveryDate] = useState(new Date());

  const [milestoneData, setMilestoneData] = useState({
    status: "",
    milestoneName: "",
    startDate: "",
    deliveryDate: "",
  });

  const updateContractStatus = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contractStatus: contractStatus,
      }),
    };

    fetch(
      process.env.REACT_APP_BASE_URL + "/contracts/status/" + contractId,
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
        getSuccessToast("Contract status updated successfully!");
      })
      .catch((error) => {
        console.log(error);
        getErrorToast("Error! Couldn't update contract");
      });

    navigate("/contract");
  };

  const handleContractStatus = (e) => {
    setContractStatus(e.target.value);
  };

  const handleMilestoneChanges = (e) => {
    e.preventDefault();

    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    const newMilestoneData = { ...milestoneData };
    newMilestoneData[fieldName] = fieldValue;

    setMilestoneData(newMilestoneData);
  };

  const addMilestoneData = (e) => {
    e.preventDefault();

    const resObject = {
      milestone: {
        status: milestoneData.status,
        milestoneName: milestoneData.milestoneName,
        startDate: startDate,
        deliveryDate: deliveryDate,
      },
    };

    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resObject),
    };

    fetch(
      process.env.REACT_APP_BASE_URL + "/contracts/milestone/add/" + contractId,
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
        setMilestoneData({
          status: "",
          milestoneName: "",
          startDate: "",
          deliveryDate: "",
        });
        getSuccessToast("Milestone added successfully!");
      })
      .catch((error) => {
        console.log(error);
        getErrorToast("Error! Couldn't add milestone");
      });
    navigate("/contract");
  };

  return (
    <div className="mainContainer">
      <div className="updateStatusContainer">
        <div className="contractStatusCon">
          <label> Contract Status: </label>
          <select
            name="contractStatus"
            onChange={handleContractStatus}
            defaultValue={"ready"}
          >
            <option value="ready">Ready</option>
            <option value="inprogress">In-progress</option>
            <option value="suspended">Suspended</option>
            <option value="completed">Completed</option>
          </select>
          <button
            style={{ marginTop: "10px", height: "45px", fontSize: "17px" }}
            onClick={updateContractStatus}
          >
            Update status
          </button>
        </div>
      </div>
      <hr
        style={{
          background: "grey",
          width: "100%",
          color: "grey",
          borderColor: "grey",
          height: "3px",
          marginTop: "50px",
          marginLeft: "10px",
          alignSelf: "center",
        }}
      />
      <div className="addMilestoneContainer">
        <form style={{ display: "flex", flexDirection: "column" }}>
          <h1> Add new milestone </h1>
          <div>
            <label> Milestone name: </label>
            <input
              type="text"
              placeholder="Enter Miletsone name"
              name="milestoneName"
              value={milestoneData.milestoneName}
              onChange={handleMilestoneChanges}
            />
          </div>
          <div>
            <label> Milestone status</label>
            <select
              name="status"
              onChange={handleMilestoneChanges}
              defaultValue={"ready"}
            >
              <option value="ready">Ready</option>
              <option value="inprogress">In-progress</option>
              <option value="completed">Completed</option>
              <option value="onhold">On-hold</option>
            </select>
          </div>
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
          <div>
            <label>Delivery date</label>
            <DatePicker
              selected={deliveryDate}
              name="deliveryDate"
              onChange={(date) => {
                setDeliveryDate(date);
              }}
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <button onClick={addMilestoneData}> Submit </button>
        </form>
      </div>
    </div>
  );
};

export default EditContract;
