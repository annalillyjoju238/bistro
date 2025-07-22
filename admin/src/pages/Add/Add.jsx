import React, { useEffect, useState } from 'react';
import './Add.css';
import axios from "axios";
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const Add = ({ url }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const editItem = location.state?.editItem || null;

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  });

  useEffect(() => {
    if (editItem) {
      setData({
        name: editItem.name,
        description: editItem.description,
        price: editItem.price,
        category: editItem.category
      });
      setPreviewImage(editItem.image);
      setImage(null); 
    }
  }, [editItem]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);

    if (image) {
      formData.append("image", image);
    }

    try {
      let response;
      if (editItem) {
        response = await axios.put(`${url}/api/food/update/${editItem._id}`, formData);
      } else {
        response = await axios.post(`${url}/api/food/add`, formData);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/admin/food-list");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className='add'>
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={previewImage || assets.upload_area}
              alt="preview"
            />
          </label>
          <input
            onChange={handleImageChange}
            type="file"
            id="image"
            accept="image/*"
            required={!editItem}
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            required
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          />
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category" value={data.category}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="$20"
              required
            />
          </div>
        </div>

        <button type="submit" className="add-btn">
          {editItem ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default Add;
