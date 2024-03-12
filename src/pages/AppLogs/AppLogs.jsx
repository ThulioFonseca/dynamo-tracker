import { useState } from "react";
import Modal from "../../components/Common/Modal/Modal";
import SearchSelect from "../../components/Inputs/SearchSelect/SearchSelect";

export default function AppLogs() {
  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    // Adicione outras opções conforme necessário
  ];

  return (
    <div>
      <h1>Logs</h1>
      <SearchSelect options={options} onChange={(item) => console.log(item)} onSearch={(item) => console.log(item)} />
    </div>
  );
}
