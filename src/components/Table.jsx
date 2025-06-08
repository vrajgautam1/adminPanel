import React, { useEffect } from "react";
import "/assets/script";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Table({
  product,
  setProduct,
  productList,
  setProductList,
  editableProduct,
  setEditableProduct,
}) {
  let navigate = useNavigate();
  const url = "http://localhost:3000/products";
  
  async function handleDelete(id) {
    //-1 this line deletes the entry from the database not the state. 
    await axios.delete(url+`/${id}`)

    //-2 this line deletes the entry from the state so that we can see things instantly.  
    let updatedProductList = productList.filter((p) => p.id != id);
    setProductList(updatedProductList);
  }

  function handleEdit(id) {
    let productToEdit = productList.find((p) => p.id === id);
    setEditableProduct(productToEdit);
    navigate("/form");
  }

  useEffect(() => {
    async function getData() {
      try {
        let res = await axios.get(url);
        let data = res.data;
        setProductList(data);
      } catch (error) {
        console.log(error.message);
        setProductList([]);
      }
    } 
    getData();
  }, []);

  return (
    <div>
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <div className="d-flex align-items-center">
              <h4 className="card-title">Add Row</h4>
              <button
                className="btn btn-primary btn-round ms-auto"
                data-bs-toggle="modal"
                data-bs-target="#addRowModal"
              >
                <i className="fa fa-plus" />
                Add Row
              </button>
            </div>
          </div>

          <div className="card-body">
            {/* Modal */}
            <div
              className="modal fade"
              id="addRowModal"
              tabIndex={-1}
              role="dialog"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header border-0">
                    <h5 className="modal-title">
                      <span className="fw-mediumbold"> New</span>
                      <span className="fw-light"> Row </span>
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p className="small">
                      Create a new row using this form, make sure you fill them
                      all
                    </p>
                    <form>
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group form-group-default">
                            <label>Name</label>
                            <input
                              id="addName"
                              type="text"
                              className="form-control"
                              placeholder="fill name"
                            />
                          </div>
                        </div>
                        <div className="col-md-6 pe-0">
                          <div className="form-group form-group-default">
                            <label>Position</label>
                            <input
                              id="addPosition"
                              type="text"
                              className="form-control"
                              placeholder="fill position"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-group-default">
                            <label>Office</label>
                            <input
                              id="addOffice"
                              type="text"
                              className="form-control"
                              placeholder="fill office"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer border-0">
                    <button
                      type="button"
                      id="addRowButton"
                      className="btn btn-primary"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <table
                id="add-row"
                className="display table table-striped table-hover table-responsive"
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>SKU</th>
                    <th>image</th>
                    <th>Description</th>
                    <th>Warehouse</th>
                    <th style={{ width: "10%" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {productList.map((prod, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{prod.productName}</td>
                        <td>{prod.quantity}</td>
                        <td>{prod.sku}</td>
                        <td>
                          <img
                            src={prod.image?.url || ""}
                            alt={prod.image?.url || ""}
                            width="25"
                          />
                        </td>
                        <td>{prod.description}</td>
                        <td>
                          <ul>
                            {prod.warehouse
                              ? prod.warehouse.map((wh) => {
                                  return <li>{wh}</li>;
                                })
                              : ""}
                          </ul>
                        </td>
                        <td>
                          <div className="form-button-action">
                            <button
                              type="button"
                              className="btn btn-link btn-primary btn-lg"
                              data-original-title="Edit Task"
                              onClick={() => handleEdit(prod.id)}
                            >
                              <i className="fa fa-edit" />
                            </button>
                            <button
                              type="button"
                              className="btn btn-link btn-danger"
                              data-original-title="Remove"
                              onClick={() => handleDelete(prod.id)}
                            >
                              <i className="fa fa-times" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
