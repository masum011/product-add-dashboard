import React, { useEffect, useState } from "react";
import "./home.css";
import Products from "../../components/Products";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";

import img1 from '../../assets/images/Rectangle36.png'
const Home = () => {
  const navigate=useNavigate()
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await fetch("/data/shoes.json");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  const handleNavigate=()=>{
    navigate('add-product')
  }

  const handlesubmit=()=>{
    handleCloseModal()
    setSelectedOption('')
  }
  return (
    <div className="home-view">
      <header>
        <div className="title-div">
          <h2>Products</h2>
        </div>
        <div className="btn-div">
          <button onClick={handleOpenModal}>Add Category</button>
          <button onClick={handleNavigate}>Add Product</button>
        </div>
      </header>
      <div className="content-main">
        <section>
          <Products title="Shoes">
            {loading === true ? (
              <h3>Loading...</h3>
            ) : (
              data.slice(0,5).map((item, index) => (
                <div key={index} className="card">
                  <div className="img">
                    <img src={img1} alt="product" />
                  </div>
                  <div className="card-details">
                    <p id="title">{item.productTitle}</p>
                    <p>${item.price}</p>
                    <p id="brand">{item.brand}</p>
                  </div>
                </div>
              ))
            )}
          </Products>
        </section>
        <section>
          <Products title="T-shirt">
          {loading === true ? (
              <h3>Loading...</h3>
            ) : (
              data.slice(5,8).map((item, index) => (
                <div key={index} className="card">
                  <div className="img">
                    <img src="" alt="product" />
                  </div>
                  <div className="card-details">
                    <p id="title">{item.productTitle}</p>
                    <p>${item.price}</p>
                    <p id="brand">{item.brand}</p>
                  </div>
                </div>
              ))
            )}
          </Products>
        </section>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        wrap="custom-modal-class"
      >
        <p id="modal-title">Add category</p>
        <label>Category name *</label>
        <input type="text" onChange={handleSelectChange} value={selectedOption} />
        <div className="modal-btn btn-div ">
          <button onClick={handleCloseModal}>Cancel</button>
          <button onClick={handlesubmit}>Save</button>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
