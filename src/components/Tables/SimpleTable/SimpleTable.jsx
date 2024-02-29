import PropTypes from "prop-types";
import { Table } from "react-bootstrap";
import CheckBox from "../../Inputs/CheckBox/CheckBox";
import { useEffect, useState } from "react";
import "./Style.css";

/**
 * Componente de tabela simples com opção de checkbox.
 * @param {Object} props - Propriedades do componente.
 * @param {string[]} props.header - Cabeçalho da tabela.
 * @param {Object[]} props.data - Dados da tabela.
 * @param {boolean} props.useCheckbox - Indica se deve exibir checkbox.
 * @param {Function} props.onItemsCheckedChange - Função de retorno para itens marcados.
 * @returns {JSX.Element} Componente de tabela simples.
 */
export default function SimpleTable({
  header,
  data,
  useCheckbox,
  onItemsCheckedChange,
}) {
  const [checkedItems, setCheckedItems] = useState([]);

  // Manipulador de evento para marcar/desmarcar um item
  const handleItemCheck = (itemId) => {
    setCheckedItems((prevCheckedItems) => {
      if (prevCheckedItems.includes(itemId)) {
        return prevCheckedItems.filter((id) => id !== itemId);
      } else {
        return [...prevCheckedItems, itemId];
      }
    });
  };

  // Manipulador de evento para marcar/desmarcar todos os itens
  const handleCheckAll = () => {
    if (checkedItems.length === data.length) {
      setCheckedItems([]);
    } else {
      const allIds = data.map((item) => item.Id);
      setCheckedItems(allIds);
    }
  };

  // Chama a função de retorno de chamada com a lista de itens marcados sempre que ela mudar
  useEffect(() => {
    onItemsCheckedChange(checkedItems);
  }, [checkedItems, onItemsCheckedChange]);

  return (
    <Table responsive hover size="sm" className="simple-table">
      <thead>
        <tr>
          {useCheckbox && (
            <th style={{ width: "2rem" }}>
              <CheckBox
                checked={checkedItems.length === data.length}
                onChange={handleCheckAll}
              />
            </th>
          )}
          {header.map((item) => (
            <th key={item["Id"]}>
              <div className="table-cell">{item}</div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item["Id"]} onClick={() => handleItemCheck(item["Id"])}>
            {useCheckbox && (
              <td>
                <CheckBox
                  checked={checkedItems.includes(item["Id"])}
                  onChange={() => handleItemCheck(item["Id"])}
                />
              </td>
            )}
            {Object.keys(item)
              .filter((key) => key !== "Id")
              .map((key) =>
                key === "Status" ? (
                  <td key={item["Id"] + key}>
                    <div className="table-cell">
                      {item[key] === "Active" ? (
                        <i
                          className="bi bi-check-circle-fill"
                          style={{ paddingRight: "0.5rem", color: "#75bb2c" }}
                        />
                      ) : (
                        <i
                          className="bi bi-x-circle-fill"
                          style={{ paddingRight: "0.5rem", color: "#de2827" }}
                        />
                      )}
                      {item[key]}
                    </div>
                  </td>
                ) : (
                  <td key={item["Id"] + key}>
                    <div className="table-cell">{item[key]}</div>
                  </td>
                )
              )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

SimpleTable.propTypes = {
  header: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  useCheckbox: PropTypes.bool.isRequired,
  onItemsCheckedChange: PropTypes.func.isRequired,
};
