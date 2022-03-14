import React, { useState, useEffect } from "react";

import { getProducts } from "./helper/coreapicalls";
import Base from "./Base";

import "../styles.css";
import Card from "./Card";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
        console.log(error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  });

  return (
    <Base title="Kass Store" description="A simple convenience store">
      <div className="row">
        {products.map((product, index) => {
          return (
            <div key={index} className="col-12 col-md-6 col-lg-4 ">
              <Card product={product} />
            </div>
          );
        })}
      </div>
    </Base>
  );
};
export default Home;
