import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Product() {
  const productNameRef = useRef(null);
  const productIdRef = useRef(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(()=> {
    productIdRef.current.focus();
  },[])

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(productNameRef.current.value);
    if (validInput()) {
      fetch("http://localhost:5000/api/product", {
        method: "POST",
        body: JSON.stringify({
          id: parseInt(productIdRef.current.value),
          name: productNameRef.current.value,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => {
          console.log(res.status);
          if (res.status === 400) {
            setError(
              "Product with the given ID is already used. Please enter a different ID."
            );
            
          } else return res.json();
        })
        .then((data) => {
          console.log(data);
          if (data) navigate("/products");
        })
        .catch((error) => {
          console.log(error);
          setError(error);
        });
    }
  };

  const validInput = () => {
    const name = productNameRef.current.value;
    const pid = productIdRef.current.value;
    if (name == '' || name.length < 3) {
      setError("Name is a required field and need minimum 3 chars");
      return false;
    }
    if (pid == null || pid == "") {
        setError("Product Id is a required field.");
        return false;
    }
    return true;
  };

  return (
    <>
    <h2 className="mb-2">Add Product</h2>
      <div className="d-flex mb-5">
        <Link to="/">Home</Link>
        <Link className="mx-3" to="/products">
          Products
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        
        {error && <p className="text-danger mx-3">{error}</p>}
        <div className="mb-3">
          <label htmlFor="pid" className="form-label mx-3">
            Product Id *&nbsp;
          </label>
          <input type="text" className="mx-4" ref={productIdRef} id="pid" />
        </div>
        <div>
          <label htmlFor="pname" className="form-label mx-3">
            Product Name *&nbsp;
          </label>
          <input type="text" ref={productNameRef} className="" id="pname" />
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary float-right" type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default Product;
