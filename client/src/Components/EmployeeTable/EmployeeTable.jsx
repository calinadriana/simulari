import { Link } from "react-router-dom";
import "./EmployeeTable.css";
import { useState } from "react";
import { useAtom } from "jotai";
import state from "./stateEmpl";

const EmployeeTable = ({ employees, onDelete }) => {
    const [data, setData] = useState(employees);
    const [sorted, setSorted] = useState(false);
    const [missing, setMissing] = useState([]);
    const [missingPeople, setMissingPeople] = useAtom(state.missingPeople);

    const changeLevel = (event) => {
        console.log(event.target.value);
        let filteredByLevel = employees.filter((em) => {
            if (em.level === event.target.value) {
                return em;
            }
            if (event.target.value === "") {
                return employees;
            }
        });
        setData(filteredByLevel);
    };
    const changePosition = (event) => {
        console.log(event.target.value);
        let filteredByPosition = employees.filter((em) => {
            if (em.position === event.target.value) {
                return em;
            }
            if (event.target.value === "") {
                return employees;
            }
        });
        setData(filteredByPosition);
    };

    const sortBy = (event) => {
        console.log({ event: { value: event.target.value }, data: data });

        if (event.target.value === "First") {
            const first = data.sort((a, b) => (a.name < b.name ? -1 : 1));
            setData(first);
            setSorted(!sorted);
        }

        if (event.target.value === "Middle") {
            setData(
                employees.sort((a, b) =>
                    a.name.replace(/^.+?\s(.+?)\s(.+?)/, "$1 $2") >
                    b.name.replace(/^.+?\s(.+?)\s(.+?)/, "$1 $2")
                        ? -1
                        : 1
                )
            );
            setSorted(!sorted);
        }
        if (event.target.value === "Last") {
            setData(
                employees.sort((a, b) =>
                    a.name.replace(/.+?\s(.+?)$/, "$1 $2") >
                    b.name.replace(/.+?\s(.+?)$/, "$1 $2")
                        ? -1
                        : 1
                )
            );
            setSorted(!sorted);
        }
        if (event.target.value === "") {
            return employees;
        }
    };

    const handleCheckboxClick = (employee) => {
        return fetch(`/api/missing/${employee._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then(() => {
                setData(
                    data.map((elem) => {
                        if (elem._id === employee._id)
                            elem.present = !elem.present;
                        return elem;
                    })
                );
                setMissingPeople(data.filter((elem) => !elem.present));
            });
    };
    // console.clear();
    console.log(data);
    return (
        <>
            <div className="EmployeeTable">
                <Link to={`/missing`}>
                    <button type="button" id="button">
                        MISSING EMPLOYEES
                    </button>
                </Link>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <th>PRESENT</th>
                                Name
                                <select onChange={sortBy}>
                                    <option value="">Select</option>
                                    <option value="First">First</option>
                                    <option value="Middle">Middle</option>
                                    <option value="Last">Last</option>
                                </select>
                            </th>
                            <th></th>
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
                                    <option>Select an option</option>
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
                            <th>Colors</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((employee) => (
                            <tr key={employee._id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        defaultChecked={employee.present}
                                        onClick={() => {
                                            handleCheckboxClick(employee);
                                        }}
                                    />
                                </td>
                                <td>{employee.name}</td>
                                <td>{employee.level}</td>
                                <td>{employee.position}</td>
                                <td>{employee.colors}</td>
                                <td>
                                    <Link to={`/update/${employee._id}`}>
                                        <button type="button">Update</button>
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => onDelete(employee._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default EmployeeTable;
