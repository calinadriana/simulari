import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import stateEmpl from "./stateEmpl";
import { Atom, useAtom } from "jotai";

const MissingEmployees = () => {
    const [list, setList] = useAtom(stateEmpl.missingPeople);

    useEffect(() => {
        async function fetchMissingPeople() {
            try {
                const response = await fetch("http://localhost:8080/api/missing ");
                const data = await response.json();
                setList(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchMissingPeople()
    }, [setList])
    
    return (
      <div className="EmployeeTable">
        <Link to={"/"}>
          <>HOME</>
        </Link>

        <table>
          <thead>
            <tr>
              <th>Name</th>

              <th />
            </tr>
          </thead>
          <tbody>
            {list.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>

                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}




export default MissingEmployees;