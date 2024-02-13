import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const controller = new AbortController();

    fetch("http://localhost:5000/api/products", { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      });
    return () => controller.abort();
  }, [products.length]);

  return (
    <div className="my-4 product-list">
      <h2>Product List</h2>
      <div className="d-flex">
        <Link to="/">Home</Link>
        <Link className="mx-3" to="/addProduct">
          Add Product
        </Link>
      </div>
      <table className="table table-bodered mt-5">
        <thead>
          <tr>
            <th>Product Id</th>
            <th>Product Name</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.length > 0 &&
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
