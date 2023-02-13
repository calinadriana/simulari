import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./EquipTable.css";

const EquipmentTable = ({ equip, onDelete }) => {
  let equipList = equip;
  console.log(equipList);

  const [list, setList] = useState(equip);

  const [sortField, setSortField] = useState({ field: "" });

  const handleSortByName = () => {
    let sortedList = equipList.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
    });
    setList(sortedList);
    setSortField({ field: "name" });
  };
  const handleSortByType = () => {
    let sortedListType = equipList.sort((a, b) => {
      if (a.type < b.type) {
        return -1;
      }
      if (a.type > b.type) {
        return 1;
      }
    });
    setList(sortedListType);
    setSortField({ field: "type" });
  };

  const handleSortByAmount = () => {
    let sortedListAmount = equipList.sort((a, b) => {
      if (a.amount < b.amount) {
        return -1;
      }
      if (a.amount > b.amount) {
        return 1;
      }
    });
    setList(sortedListAmount);
    setSortField({ field: "amount" });
  };
  useEffect(() => {
    setList(equipList);
  }, [equipList]);

  return (
    <div className="EmployeeTable">
      <div className="inputs">
        <input type="text" placeholder="search by name" />

        <button onClick={handleSortByName}> Name</button>
        <button onClick={handleSortByType}> Type</button>
        <button onClick={handleSortByAmount}> Amount</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Amount</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {list.map((equipment) => (
            <tr key={equipment._id}>
              <td>{equipment.name}</td>
              <td>{equipment.type}</td>
              <td>{equipment.amount}</td>
              <td>
                <Link to={`/equipment/${equipment._id}`}>
                  <button type="button">Update</button>
                </Link>
                <button type="button" onClick={() => onDelete(equipment._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentTable;
