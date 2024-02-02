import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

const DeleteModal = ({
  showModalDelete,
  handleCloseDelete,
  index,
  getData,
}) => {
  const [serial, setSerial] = useState();
  useEffect(() => {
    setSerial(index);
  }, [index]);

  const deleteRow = () => {
    
    const str = localStorage.getItem("userData");
    const data = JSON.parse(str);

    data.splice(serial, 1);
    getData(data);
    localStorage.setItem("userData", JSON.stringify(data));
    // alert("Data is deleted!!!⚠️💀")
  };
  
  
  const clickHandler = () => {
    
    deleteRow();
    // notify();
    handleCloseDelete();
    // notify();
    console.log("End of Click handler");
  };

  return (
    <>{showModalDelete &&(
      <div
        className={`modal ${showModalDelete ? "fade show" : ""}`}
        id={`deleteModal-${index}`} // Unique ID based on the index
        tabIndex={-1}
        role="dialog"
        aria-labelledby={`deleteModalLabel-${index}`} // Unique ID based on the index
        aria-hidden={!showModalDelete}
        style={{ display: showModalDelete ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Deleting user</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseDelete}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete the Detail?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  clickHandler();
                }}
              >
                Delete User
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
                onClick={handleCloseDelete}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>)}
    </>
  );
};

export default DeleteModal;
