import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EquipmentTable from "../Components/EquipTable";

const fetchEquip = (signal) => {
  return fetch("/api/equipment/", { signal }).then((res) => res.json());
};

const deleteEquip = (id) => {
  return fetch(`/api/equipment/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EquipList = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const handleDelete = (id) => {
    deleteEquip(id).catch((err) => {
      console.log(err);
    });

    setData((equip) => {
      return equip.filter((equip) => equip._id !== id);
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    fetchEquip(controller.signal)
      .then((equip) => {
        setLoading(false);
        setData(equip);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setData(null);
          throw error;
        }
      });

    return () => controller.abort();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <EquipmentTable equip={data} onDelete={handleDelete} />;
};

export default EquipList;
