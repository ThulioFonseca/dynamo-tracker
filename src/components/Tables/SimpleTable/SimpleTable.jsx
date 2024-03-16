import PropTypes from "prop-types";
import { Table } from "react-bootstrap";
import CheckBox from "../../Inputs/CheckBox/CheckBox";
import { useEffect, useState } from "react";
import "./Style.css";

/**
 * Renders a simple table with the given columns and data, with optional checkbox functionality.
 *
 * @param {array} columns - The columns to be displayed in the table.
 * @param {array} data - The data to be rendered in the table.
 * @param {boolean} useCheckbox - Determines if checkboxes should be displayed.
 * @param {function} onItemsCheckedChange - The function to be called when the checked items change.
 * @return {JSX.Element} The rendered table component.
 */
export default function SimpleTable({
  columns,
  data,
  useCheckbox,
  onItemsCheckedChange,
}) {
  const [checkedItems, setCheckedItems] = useState([]);

  const handleItemCheck = (itemId) => {
    setCheckedItems((prevCheckedItems) => {
      if (prevCheckedItems.includes(itemId)) {
        return prevCheckedItems.filter((id) => id !== itemId);
      } else {
        return [...prevCheckedItems, itemId];
      }
    });
  };

  const handleRowClick = (itemId, event) => {
    if (event.target.tagName.toLowerCase() === "input") {
      return;
    }
    handleItemCheck(itemId);
  };

  const handleCheckAll = () => {
    if (checkedItems.length === data.length) {
      setCheckedItems([]);
    } else {
      const allIds = data.map((item) => item.id);
      setCheckedItems(allIds);
    }
    console.log(checkedItems);
  };
  function renderStatusIcon(status) {
    return status === "Active" ? (
      <i
        className="bi bi-check-circle-fill"
        style={{ paddingRight: "0.5rem", color: "#75bb2c" }}
      />
    ) : (
      <i
        className="bi bi-x-circle-fill"
        style={{ paddingRight: "0.5rem", color: "#de2827" }}
      />
    );
  }

  function renderCell(column, item) {
    if (column.key === "status") {
      return (
        <div>
          {renderStatusIcon(item[column.dataKey])}
          {item[column.dataKey]}
        </div>
      );
    } else {
      return item[column.dataKey];
    }
  }

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
                checked={checkedItems.length === data.length && data.length > 0}
                onChange={handleCheckAll}
              />
            </th>
          )}
          {columns.map((column) => (
            <th key={column.key} style={{ width: `${column.size}rem` }}>
              <div className="table-cell">{column.header}</div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} onClick={(e) => handleRowClick(item.id, e)}>
            {useCheckbox && (
              <td>
                <CheckBox
                  checked={checkedItems.includes(item.id)}
                  onChange={() => handleItemCheck(item.id)}
                  onClick={(e) => e.stopPropagation()}
                />
              </td>
            )}
            {columns.map((column) => (
              <td key={`${item.id}-${column.key}`}>
                <div className="table-cell">{renderCell(column, item)}</div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

SimpleTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      dataKey: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  useCheckbox: PropTypes.bool.isRequired,
  onItemsCheckedChange: PropTypes.func.isRequired,
};
