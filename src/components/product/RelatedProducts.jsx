
import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../context/AppContext';
import { Link } from 'react-router-dom';

const RelatedProducts = ({ category }) => {
  const { products, addToCart } = useContext(AppContext);
  const [relatedProduct, setRelatedProduct] = useState([]);

  // Scroll to top function (reusable)
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Filter related products when category or products change
  useEffect(() => {
    setRelatedProduct(
      products.filter(
        (data) =>
          data?.category?.toLowerCase() === category?.toLowerCase()
      )
    );
  }, [category, products]);

  return (
    <div className="container text-center">
      <h1>Related Product</h1>

      {/* All related products */}
      <div className="container d-flex justify-content-center align-items-center">
        <div className="row container d-flex justify-content-center align-items-center my-5">
          {relatedProduct?.map((product) => (
            <div
              key={product._id}
              className="col-md-4 my-3 d-flex justify-content-center align-items-center"
            >
              <div
                className="card bg-dark text-light text-center"
                style={{ width: '18rem' }}
              >
                {/* Scroll to top when clicked */}
                <Link
                  to={`/product/${product._id}`}
                  className="d-flex justify-content-center align-items-center p-3"
                  onClick={scrollToTop}
                >
                  <img
                    src={product.imageSrc}
                    className="card-img-top"
                    alt="..."
                    style={{
                      width: '200px',
                      height: '200px',
                      borderRadius: '10px',
                      border: '2px solid yellow',
                    }}
                  />
                </Link>

                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description}</p>

                  <div className="my-3">
                    <button className="btn btn-primary mx-3">
                      {product.price} ₹
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() =>
                        addToCart(
                          product._id,
                          product.title,
                          product.price,
                          1,
                          product.imageSrc
                        )
                      }
                      style={{ fontWeight: 'bold' }}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
