import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  Box,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Statuses } from "./constants/constants";
import "./milestone.css";

let ready_milestones = [];
let inprogress_milestones = [];
let onhold_milestones = [];
let completed_milestones = [];

const Milestone = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { contractId, contracts } = state;
  const [milestones, setMilestones] = useState([]);

  const getMilestones = (id) => {
    const contract = contracts.find((contract) => contract.contractId === id);
    const ex_milestones = contract.milestones;
    devideIntoStates(ex_milestones);
    setMilestones(ex_milestones);
  };

  useEffect(() => {
    getMilestones(contractId);
  }, []);

  const devideIntoStates = (allMilestones) => {
    allMilestones.map((milestone) => {
      switch (milestone.status) {
        case Statuses.READY:
          if (ready_milestones.indexOf(milestone) === -1)
            ready_milestones.push(milestone);
          break;

        case Statuses.IN_PROGRESS:
          if (inprogress_milestones.indexOf(milestone) === -1)
            inprogress_milestones.push(milestone);
          break;

        case Statuses.onhold_milestones:
          if (onhold_milestones.indexOf(milestone) === -1)
            onhold_milestones.push(milestone);
          break;

        case Statuses.COMPLETED:
          if (completed_milestones.indexOf(milestone) === -1)
            completed_milestones.push(milestone);
          break;

        default:
          break;
      }
    });
  };

  const resetArrays = () => {
    ready_milestones = [];
    inprogress_milestones = [];
    onhold_milestones = [];
    completed_milestones = [];
  };

  return (
    <div className="milestones-main-container">
      <div className="button-con">
        <Button
          startIcon={<ArrowBackIcon />}
          sx={{ fontSize: 18, fontWeight: "medium" }}
          onClick={() => {
            resetArrays();
            navigate("/contract");
          }}
        >
          Back to Contracts
        </Button>
      </div>
      <div className="sub-container">
        <Card sx={{ minWidth: 800, maxHeight: 400, maxWidth: 1000 }}>
          <CardHeader title={"Ready"} sx={{ backgroundColor: "#95c9fc" }} />
          <CardContent>
            <table id="inprogess-milestones">
              <thead>
                <tr>
                  <th>Milestine Name</th>
                  <th>Milestone start date</th>
                  <th>Milestone delivery date</th>
                </tr>
              </thead>
              <tbody>
                {ready_milestones.map((milestone) => (
                  <tr key={Date.now()}>
                    <td>{milestone.milestoneName}</td>
                    <td>{milestone.startDate}</td>
                    <td>{milestone.deliveryDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
      <div className="sub-container">
        <Card sx={{ minWidth: 800, maxHeight: 400, maxWidth: 1000 }}>
          <CardHeader
            title={"In-progress"}
            sx={{ backgroundColor: "#84DA7C" }}
          />
          <CardContent>
            <table id="inprogess-milestones">
              <thead>
                <tr>
                  <th>Milestine Name</th>
                  <th>Milestone start date</th>
                  <th>Milestone delivery date</th>
                </tr>
              </thead>
              <tbody>
                {inprogress_milestones.map((milestone) => (
                  <tr key={Date.now()}>
                    <td>{milestone.milestoneName}</td>
                    <td>{milestone.startDate}</td>
                    <td>{milestone.deliveryDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
      <div className="sub-container">
        <Card sx={{ minWidth: 800, maxHeight: 400, maxWidth: 1000 }}>
          <CardHeader title={"On-hold"} sx={{ backgroundColor: "#FFC300" }} />
          <CardContent>
            <table id="inprogess-milestones">
              <thead>
                <tr>
                  <th>Milestine Name</th>
                  <th>Milestone start date</th>
                  <th>Milestone delivery date</th>
                </tr>
              </thead>
              <tbody>
                {onhold_milestones.map((milestone) => (
                  <tr key={Date.now()}>
                    <td>{milestone.milestoneName}</td>
                    <td>{milestone.startDate}</td>
                    <td>{milestone.deliveryDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
      <div className="sub-container">
        <Card sx={{ minWidth: 800, maxHeight: 400, maxWidth: 1000 }}>
          <CardHeader title={"Completed"} sx={{ backgroundColor: "#A2A2A2" }} />
          <CardContent>
            <table id="inprogess-milestones">
              <thead>
                <tr>
                  <th>Milestine Name</th>
                  <th>Milestone start date</th>
                  <th>Milestone delivery date</th>
                </tr>
              </thead>
              <tbody>
                {completed_milestones.map((milestone) => (
                  <tr key={Date.now()}>
                    <td>{milestone.milestoneName}</td>
                    <td>{milestone.startDate}</td>
                    <td>{milestone.deliveryDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Milestone;
