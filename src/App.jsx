import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [productId, setProductId] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const productIdRef = useRef(null);

  useEffect(() => {
    productIdRef.current.focus();
  }, []);

  //input validation
  const isValidProductId = () => {
    const pid = productIdRef.current.value;
    if (pid == null || pid == "") {
      setError("Product Id is empty. Please enter a valid product ID.");
      return false;
    }
    return true;
  };

  //Search product
  function getProduct() {
    if (isValidProductId()) {
      fetch(`http://localhost:5000/api/products/${productId}`)
        .then((res) => res.json())
        .then((data) => {
          setMessage(`Search result: ${data.name}`);
          setError('');
        })
        .catch((err) => {
          console.log(err);
          setMessage("");
          setError("Product with the given ID was not found.");
        });
    }
    productIdRef.current.focus();
  }

  //Delete a product by id
  function deleteProduct() {
    if (isValidProductId()) {
      fetch(`http://localhost:5000/api/products/${productId}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          //console.log(" Deleted item: ", data.name);
          setMessage(`Deleted item: ${data.name}`);
          setProductId("");
        })
        .catch((err) => {
          console.log(err);
          setError("Product with the given ID was not found.");
        });
    }
    productIdRef.current.focus();
  }

  return (
    <>
      <section className="main my-4">
        <h2>Product Home</h2>
        <div className="d-flex">
          <Link to="/addProduct">
            Add Product
          </Link>
          <Link to="/products" className="mx-3">Products</Link>
        </div>
        <div className="d-flex my-5">
          <label htmlFor="pid" className="form-label mx-3">
            Product Id: *&nbsp;
          </label>
          <input
            type="text"
            ref={productIdRef}
            value={productId}
            id="pid"
            onChange={(e) => setProductId(e.target.value)}
          />
          <button className="btn btn-primary mx-3" onClick={getProduct}>
            Search By Id
          </button>
          <button className="btn btn-secondary" onClick={deleteProduct}>
            Delete
          </button>
          
        </div>
        {message && <div className="my-4 mx-3">{message}</div>}

        {error && <p className="text-danger mx-3 my-3">{error}</p>}
      </section>
    </>
  );
}

export default App;
