import { useEffect, useState } from "react";
const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const [equipment, setEquipment] = useState([]);
  const [equippet, setEquippet] = useState({});
  const [color, setColor] = useState([]);

  useEffect(() => {
    const loader = async () => {
      const req = await fetch("http://localhost:8080/api/colors/");
      const res = await req.json();
      setColor(res)
    }
    loader();
},[])
    useEffect(() => {
      const loader = async () => {
        const request = await fetch("http://localhost:8080/api/equipment/");
        const response = await request.json();
        setEquipment(response);
        setEquippet(
          response.map((e) => ({
            _id: e._id,
            number: employee.equipment.find((q) => q._id === e._id)?.number,
          }))
        );
      };
      loader();
    }, []);

  const equipments = (equipment) => {
    return fetch(`/api/equipment/${equipment._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(equipment),
    })
      .then((res) => res.json())
      .then(() => setEquipment(equipment));
  };



  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const employee = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
     
    }, {});
    employee.colors = formData.get("color");

    return onSave(employee);
  };

  const setCount = (id, ct) => {
    setEquippet(
      equippet.map((e) => {
        if (e._id === id) e.number = Math.max(0, parseInt(ct));
        return e;
        })
      )
    }



  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      {employee && (
        <input type="hidden" name="_id" defaultValue={employee._id} />
      )}

      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          defaultValue={employee ? employee.name : null}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          defaultValue={employee ? employee.level : null}
          name="level"
          id="level"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          defaultValue={employee ? employee.position : null}
          name="position"
          id="position"
        />
      </div>

      <div>
        {equipment.map((e) => (
          <>
            <label key={e._id}>
              {e.name}
              <input
                type="number"
                min={0}
                max={e.amount}
                // defaultValue={handleNumber(e._id)}
                onInput={(v) => setCount(e._id, v.target.value)}
              />
            </label>
            <br />
          </>
        ))}
      </div>

      <div className="control">
        <label htmlFor="color">Colors:</label>
        <select
          defaultValue={employee ? employee.colors : null}
          name="color"
          id="color"
        >
          <option value="">Select a color:</option>
          {color.map(cl => (
            <option key={cl._id} value={cl._id}>{cl.name}</option>
          ))}
        </select>
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
