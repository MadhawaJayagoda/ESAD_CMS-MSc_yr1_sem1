import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./contracts.css";
import data from "./mock-data.json";

const Contract = () => {
  const navigate = useNavigate();
  const [contracts, setContracts] = useState(data);

  React.useEffect(() => {
    getAllContracts();
  }, []);

  const getAllContracts = () => {
    fetch(process.env.REACT_APP_BASE_URL + "/contracts")
      .then((response) => response.json())
      .then((data) => setContracts(data))
      .catch((error) => {
        console.log("Error fetching data", error);
      });
  };

  return (
    <div className="contracts">
      <div className="button-container">
        <button onClick={() => navigate("/contract/add")}>
          Add new contract
        </button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Contract ID</th>
              <th>Customer Name</th>
              <th>Address</th>
              <th>Created Data</th>
              <th>Contract Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((contract) => (
              <tr key={contract.contractId}>
                <td>{contract.contractId}</td>
                <td>{contract.customer.name}</td>
                <td>{contract.address}</td>
                <td>{contract.startDate}</td>
                <td>{contract.contractType}</td>
                <td>
                  <div
                    style={{
                      padding: "10px",
                      backgroundColor:
                        contract.contractStatus === "ready"
                          ? "green"
                          : contract.contractStatus === "inprogress"
                          ? "blue"
                          : "red",
                      borderRadius: "10px",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    {contract.contractStatus}
                  </div>
                </td>
                <td>
                  <button
                    key={Contract.contractId}
                    className="editButton"
                    type="button"
                    onClick={() => {
                      navigate("/contract/edit", {
                        state: {
                          contractId: contract.contractId,
                        },
                      });
                    }}
                    style={{
                      backgroundColor: "grey",
                      color: "black",
                      border: "none",
                      padding: "10px",
                      borderRadius: "10px",
                      fontSize: "15px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      navigate("/milestone", {
                        state: {
                          contractId: contract.contractId,
                          contracts: contracts,
                        },
                      });
                    }}
                    style={{
                      backgroundColor: "grey",
                      color: "black",
                      border: "none",
                      padding: "10px",
                      borderRadius: "10px",
                      fontSize: "15px",
                      fontWeight: "bold",
                      marginLeft: "10px",
                      cursor: "pointer",
                    }}
                  >
                    View Milestones
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contract;
