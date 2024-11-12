import React, { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import UploadButton from "../../components/UploadButton";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import TagsInput from "react-tagsinput";
import { FaArrowRight } from "react-icons/fa";

import "react-tagsinput/react-tagsinput.css";

const initialData = [
  {
    id: 1,
    size: "M",
    color: "Black",
    sku: "ABC14",
    inStock: false,
    quantity: "",
  },
  { id: 2, size: "M", color: "Red", sku: "SDF3", inStock: true, quantity: "5" },
  {
    id: 3,
    size: "L",
    color: "Black",
    sku: "HWE2",
    inStock: false,
    quantity: "",
  },
  {
    id: 4,
    size: "L",
    color: "Red",
    sku: "ABC12",
    inStock: true,
    quantity: "9",
  },
];

const AddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    brand: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [selectData, setSelectData] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState(12000); // Initial price
  const [discount, setDiscount] = useState(12); // Initial discount
  const [discountType, setDiscountType] = useState("%"); // Default discount type is %
  const [variants, setVariants] = useState([
    { option: "", tags: [] },
    { option: "", tags: [] },
    { option: "", tags: [] },
  ]);
  const [data, setData] = useState(initialData);

  console.log(selectData);

  const handleProduct = (e) => {
    const { name, value } = e.target;
    setProduct((preState) => ({
      ...preState,
      [name]: value,
    }));
  };
  const allData = {
    name: product.name,
    category: selectData,
    brand: product.brand,
    image: image,
    variants: variants,
    combinations: data,
    priceInr: price,
    discount: {
      method: discountType,
      value: discount,
    },
  };
  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      alert('Please check console')
      console.log(allData);
      navigate('/')
    }
  };

  const handleCancel = () => {
    if (currentStep >= 2) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/");
    }
  };

  // Handle option input change
  const handleOptionChange = (index, value) => {
    const newVariants = [...variants];
    newVariants[index].option = value;
    setVariants(newVariants);
  };

  // Handle adding new tag value
  const handleTagsChange = (index, newTags) => {
    const newVariants = [...variants];
    newVariants[index].tags = newTags;
    setVariants(newVariants);
  };

  // Add new variant (option and tags)
  const addVariant = () => {
    setVariants([...variants, { option: "", tags: [] }]);
  };

  // Remove variant (option and tags)
  const removeVariant = (index) => {
    const newVariants = variants.filter((_, i) => i !== index);
    setVariants(newVariants);
  };

  // Validation for empty option field

  // tab3

  const handleSKUChange = (id, value) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, sku: value } : item
    );
    setData(updatedData);
  };

  const handleInStockChange = (id) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, inStock: !item.inStock } : item
    );
    setData(updatedData);
  };

  const handleQuantityChange = (id, value) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, quantity: value } : item
    );
    setData(updatedData);
  };

  const isDuplicateSKU = (sku) => {
    return data.filter((item) => item.sku === sku).length > 1;
  };

  // tab4

  return (
    <div className="product home-view ">
      <div className="title-div">
        <h2 onClick={() => navigate("/")}>Add product</h2>
        <div className="btn-div ">
          <button className="btn" onClick={handleCancel}>
            {currentStep >= 2 ? "Back" : "Cancle"}
          </button>
          <button className="btn" onClick={handleNext}>
            {currentStep < 4 ? "Next" : "Confirm"}
          </button>
        </div>
      </div>
      <div className="add-product-div">
        <div>
          <div className="naviagte-path">
            <p className={currentStep >= 1 ? "active-step" : ""}>Description</p>
            <FaArrowRight />
            <p className={currentStep >= 2 ? "active-step" : ""}>Variants</p>
            <FaArrowRight />
            <p className={currentStep >= 3 ? "active-step" : ""}>
              Combinations
            </p>
            <FaArrowRight />
            <p className={currentStep >= 4 ? "active-step" : ""}>Price info</p>
          </div>
          {currentStep === 1 && (
            <div className="add-product-details">
              <p id="title">Description</p>
              <label>Product name *</label>
              <input
                type="text"
                value={product.name}
                name="name"
                onChange={handleProduct}
              />
              <label>Category name *</label>
              <select
                id="select-dropdown"
                value={selectData}
                onChange={(e) => setSelectData(e.target.value)}
              >
                <option value="">---</option>
                <option value="Tshirt">Tshirt</option>
                <option value="Shoes">Shoes</option>
                <option value="option3">Option 4</option>
              </select>
              <label>Brand *</label>
              <input
                type="text"
                name="brand"
                value={product.brand}
                onChange={handleProduct}
              />
              <br />
              <br />
              <UploadButton setImage={setImage} image={image} />
              <br />
            </div>
          )}

          {currentStep === 2 && (
            <div className="add-product-details">
              <p id="title">Variants</p>
              <div className="property">
                <p>Option *</p>
                <p>Values *</p>
              </div>
              {variants.map((variant, index) => (
                <div key={index} className="input-div">
                  <input
                    type="text"
                    placeholder="Add Option"
                    value={variant.option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                  />
                  <TagsInput
                    value={variant.tags}
                    onChange={(newTags) => handleTagsChange(index, newTags)}
                    addOnBlur={true}
                    addKeys={[9, 13]} // Allow tab and enter to add tags
                    inputProps={{
                      placeholder: "Add Tags",
                    }}
                  />
                  <RiDeleteBin6Line
                    color="red"
                    size="1.7em"
                    onClick={() => removeVariant(index)}
                    className="delete-icon"
                  />
                </div>
              ))}

              {/* Add new option button */}
              <div className="add-opetion" onClick={addVariant}>
                <FaPlus /> Add Option
              </div>
            </div>
          )}
          {currentStep === 3 && (
            <div className="add-product-details">
              <p id="title">Combinations</p>
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>SKU *</th>
                    <th>In stock</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td>
                        {item.size}/{item.color}
                      </td>
                      <td className="sku-input">
                        <input
                          type="text"
                          value={item.sku}
                          onChange={(e) =>
                            handleSKUChange(item.id, e.target.value)
                          }
                          className={
                            isDuplicateSKU(item.sku) ? "duplicate" : ""
                          }
                        />
                        {isDuplicateSKU(item.sku) && (
                          <span className="errorsss">Duplicate SKU</span>
                        )}
                      </td>
                      <td>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={item.inStock}
                            onChange={() => handleInStockChange(item.id)}
                          />
                          <span className="slider"></span>
                        </label>
                      </td>
                      <td>
                        <input
                          type="text"
                          value={item.quantity}
                          disabled={item.inStock ? true : false}
                          onChange={(e) =>
                            handleQuantityChange(item.id, e.target.value)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {currentStep === 4 && (
            <div className="add-product-details">
              <div>
                <p id="title">Price info</p>
                <label className="label">
                  Price *
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="input price-input"
                  />
                </label>

                <label className="label discount-label">
                  Discount
                  <div className="discount-container">
                    <input
                      type="number"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      className="input discount-input"
                    />
                    <div className="button-group">
                      <button
                        onClick={() => setDiscountType("%")}
                        className={`button ${
                          discountType === "%" ? "active" : ""
                        }`}
                      >
                        %
                      </button>
                      <button
                        onClick={() => setDiscountType("$")}
                        className={`button ${
                          discountType === "$" ? "active" : ""
                        }`}
                      >
                        $
                      </button>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Modal Buttons */}
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
