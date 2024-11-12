import React from "react";
import "./styles.css";
const Products = (props) => {
  const { title, children } = props;
  return (
    <div className="product-view">
      <p>{title}</p>
      <div className="content">{children}</div>
    </div>
  );
};

export default Products;
