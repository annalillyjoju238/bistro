import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching food list");
      }
    } catch (error) {
      toast.error("Server error while fetching list");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, {
        id: foodId,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error("Error removing food item");
      }
    } catch (error) {
      toast.error("Server error while removing item");
    }
  };


  useEffect(() => {
    fetchList();
  }, []);

  const handleEditClick = (item) => {
    navigate("/add", { state: { editItem: item } });
  };

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item) => (
          <div className="list-table-format" key={item._id}>
            <img
              src={
                item.image.startsWith("http")
                  ? item.image
                  : `${url}/images/${item.image}`
              }
              alt={item.name}
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <div style={{ display: "flex", gap: "10px" }}>
              <p onClick={() => handleEditClick(item)} className="cursor">
                ✏️
              </p>
              <p onClick={() => removeFood(item._id)} className="cursor">
                ❌
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
