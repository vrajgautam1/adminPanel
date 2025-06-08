import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Form({
  product,
  setProduct,
  productList,
  setProductList,
  imgRef,
  editableProduct,
  setEditableProduct,
  error,
  setError,
}) {
  let navigate = useNavigate();
  const url = "http://localhost:3000/products";
  function handleChange(e) {
    let { name, value, checked, files } = e.target;

    if (name === "image") {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const data = {
          name: file.name,
          type: file.type,
          url: reader.result,
        };
        value = data;
        setProduct({ ...product, [name]: value });
      };
      reader.readAsDataURL(file); // 🔥 THIS is what was missing!
      return;
    }

    if (name === "warehouse") {
      let newArray = Array.isArray(product.warehouse)
        ? [...product.warehouse]
        : [];
      if (checked) {
        newArray.push(value);
      } else {
        newArray = newArray.filter((p) => p != value);
      }

      setProduct({ ...product, warehouse: newArray });
    } else {
      setProduct({ ...product, [name]: value });
    }
  }

  // useEffect(() => {
  //   let newArray = Array.isArray(productList) ? [...productList] : [];
  //   localStorage.setItem("productList", JSON.stringify(newArray));
  // }, [productList]);

  useEffect(() => {
    if (editableProduct) {
      setProduct(editableProduct);
    }
  }, [editableProduct]);

  function validator() {
    let errors = {};

    if (!product.productName) errors.productName = "product name is needed";
    if (!product.quantity) errors.quantity = "quantity is needed";
    if (!product.sku) errors.sku = "sku is needed";
    if (!product.image) errors.image = "image is needed";
    if (!product.description) errors.description = "description is needed";
    if (!product.warehouse) errors.warehouse = "warehouse is needed";
    setError(errors);

    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validator()) return;

    if (editableProduct && editableProduct.id) {
      await axios.put(url+`/${editableProduct.id}`, product)
      //we can safely avoid modifying the productList State because we are going to a new page.
      //if 
    } else {
      let newProduct = { ...product, id: Date.now() };
      await axios.post(url, product);
    }

    setEditableProduct({});
    setProduct({});
    if (imgRef.current) imgRef.current.value = "";
    navigate("/table");
  }

  useEffect(() => {
    console.log(productList);
  }, [productList]);
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Form Elements</div>
            </div>

            {/* form start  */}
            <form action="" method="post" onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    {/* 1-product name  */}
                    <div className="form-group">
                      <label htmlFor="productName">Product Name</label>
                      <input
                        type="text"
                        name="productName"
                        className="form-control"
                        id="productName"
                        placeholder="Enter product name"
                        onChange={handleChange}
                        value={product.productName || ""}
                      />
                    </div>
                    <p className="px-3" style={{ color: "red" }}>
                      {error.productName}
                    </p>

                    {/* 2-product quantity  */}
                    <div className="form-group">
                      <label htmlFor="quantity">Quantity</label>
                      <input
                        type="number"
                        name="quantity"
                        className="form-control"
                        id="quantity"
                        placeholder="Enter quantity"
                        onChange={handleChange}
                        value={product.quantity || ""}
                      />
                      <p className="px-3" style={{ color: "red" }}>
                        {error.quantity}
                      </p>
                    </div>

                    {/* 3-product sku  */}
                    <div className="form-group">
                      <label htmlFor="sku">SKU</label>
                      <input
                        type="text"
                        name="sku"
                        className="form-control"
                        id="sku"
                        placeholder="Enter SKU"
                        onChange={handleChange}
                        value={product.sku || ""}
                      />
                      <p className="px-3" style={{ color: "red" }}>
                        {error.sku}
                      </p>
                    </div>

                    {/* image upload goes here */}
                    <div className="form-group">
                      <label htmlFor="image">Image</label>
                      <input
                        type="file"
                        name="image"
                        className="form-control"
                        id="image"
                        placeholder="Upload image"
                        onChange={handleChange}
                        ref={imgRef}
                      />
                      <p className="px-3" style={{ color: "red" }}>
                        {error.image}
                      </p>
                    </div>

                    {/* 4-Description  */}
                    <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <textarea
                        className="form-control"
                        name="description"
                        id="description"
                        rows={5}
                        placeholder="Enter product description"
                        onChange={handleChange}
                        value={product.description || ""}
                      ></textarea>
                      <p className="px-3" style={{ color: "red" }}>
                        {error.description}
                      </p>
                    </div>

                    {/* 5-Checkboxes  */}
                    <div className="form-group">
                      <label>Available At (Warehouses)</label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="surat"
                          onChange={handleChange}
                          name="warehouse"
                          value="surat"
                          checked={
                            product.warehouse?.includes("surat") || false
                          }
                        />
                        <label className="form-check-label" htmlFor="surat">
                          Surat
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="vadodara"
                          onChange={handleChange}
                          name="warehouse"
                          value="vadodara"
                          checked={
                            product.warehouse?.includes("vadodara") || false
                          }
                        />
                        <label className="form-check-label" htmlFor="vadodara">
                          Vadodara
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="ahmedabad"
                          onChange={handleChange}
                          name="warehouse"
                          value="ahmedabad"
                          checked={
                            product.warehouse?.includes("ahmedabad") || false
                          }
                        />
                        <label className="form-check-label" htmlFor="ahmedabad">
                          Ahmedabad
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="rajkot"
                          name="warehouse"
                          value="rajkot"
                          onChange={handleChange}
                          checked={
                            product.warehouse?.includes("rajkot") || false
                          }
                        />
                        <label className="form-check-label" htmlFor="rajkot">
                          Rajkot
                        </label>
                      </div>

                      <p className="px-3" style={{ color: "red" }}>
                        {error.warehouse}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 6-Buttons  */}
              <div className="card-action">
                <button className="btn btn-success" type="submit">
                  Submit
                </button>
                <button className="btn btn-danger">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
