import React, {useState } from "react";

import EditModal from "./action/Edit";
import DeleteModal from "./action/DeleteModal";

const ButtonComponent = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
        <i
          className="fa fa-pencil text-primary pe pe-auto"
          aria-hidden="true"
          data-toggle="modal"
          data-target={`#editModal-${props.user}`} 
          onClick={handleOpenModal}
          style={{ marginRight: '10px', fontSize:'20px', cursor:'pointer'}}
        ></i>
        <i
          className="fa fa-trash text-danger pe pe-auto"
          aria-hidden="true"
          data-toggle="modal"
          data-target={`#deleteModal-${props.user}`}
          onClick={handleDeleteModal}
          style={{fontSize:'20px',  cursor:'pointer'}}
        >
        </i>
      {/* EditModal component */}
      <EditModal
        showModal={showModal}
        index={props.user}
        handleClose={handleCloseModal}
        getData={(data) => {
          handleCloseModal();
          props.getData(data);
        }}
      />
      {/* DeleteModal component */}
      <DeleteModal
        showModalDelete={showDeleteModal}
        index={props.user}
        handleCloseDelete={handleCloseDeleteModal}
        getData={(data) => {
          handleCloseDeleteModal();
          props.getData(data);
        }}
      />
    </>
  );
};
export default ButtonComponent;
