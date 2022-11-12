import React from "react";
import { createContext, useState } from "react";

const ContractContext = createContext();

export function ContractProvider({ children }) {
  const [contracts, setContracts] = useState([]);

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
    <ContractContext.Provider value={{ allContracts: contracts }}>
      {children}
    </ContractContext.Provider>
  );
}

export default ContractContext;
