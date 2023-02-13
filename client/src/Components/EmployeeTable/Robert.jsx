import { Link } from "react-router-dom";
import { useState } from "react";

const RobertTable = ({ employees, onDelete }) => {
  // let Robert = [];
  // // eslint-disable-next-line array-callback-return
  //   const [data,setData] = useState(Robert)
  // employees.map((employee) => {
  //   if (employee.name.includes("Robert")) {
  //     Robert.push(employee);
  //   }
  // });
  let Robert = employees.filter((em) => (em.name.includes("Robert")))

   const [data,setData] = useState(Robert)
    const changeLevel = (event) => {
        console.log(event.target.value);
        let filteredByLevel = Robert.filter((em) => {
            if (em.level === event.target.value) {
                return em
            }
            if (event.target.value === "") {
                return Robert;
            }
        });setData(filteredByLevel);
    }
    const changePosition = (event) => {
      console.log(event.target.value);
      let filteredByPosition = Robert.filter((em) => {
        if (em.position === event.target.value) {
          return em;
        }
        if (event.target.value === "") {
          return Robert;
        }
      });
      setData(filteredByPosition);
    };

    
  return (
    <>
      <div className="EmployeeTable">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>
                Level
                <select onChange={changeLevel}>
                  <option value="">Select an option</option>
                  <option>Junior</option>
                  <option>Medior</option>
                  <option>Senior</option>
                  <option>Expert</option>
                  <option>Godlike</option>
                </select>
              </th>
              <th>
                Position
                <select onChange={changePosition}>
                  <option value="">Select an option</option>
                  <option>Main Actor</option>
                  <option>Comic Relief</option>
                  <option>Love Interests</option>
                  <option>Protagonist</option>
                  <option>Antagonist</option>
                  <option>Operatour</option>
                  <option>Director</option>
                  <option>Joker</option>
                  <option>Superhero</option>
                </select>
              </th>
              <th />
            </tr>
          </thead>
          <tbody>
            {data.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.level}</td>
                <td>{employee.position}</td>
                <td>
                  <Link to={`/update/${employee._id}`}>
                    <button type="button">Update</button>
                  </Link>
                  <button type="button" onClick={() => onDelete(employee._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      ;
    </>
  );
};

export default RobertTable;
