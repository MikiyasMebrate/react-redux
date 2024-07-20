import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalDelete = ({handleDeleteModal, data ,show, handleSubmitDelete, handleOnDeleteSubmit}) => {
     
    return (
        <>
        <Modal size="lg" show={show} onHide={handleDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add new </Modal.Title>
        </Modal.Header>

        <form onSubmit={handleSubmitDelete(handleOnDeleteSubmit)}>
        <Modal.Body>
            Are you sure you want to delete <span className="text-danger fw-bold">{data?.name}</span> ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteModal}>
            Close
          </Button>
          <button type="submit" className="btn btn-danger">Delete</button>
          
        </Modal.Footer>
        </form>

      </Modal>
        </>
    );
}
 
export default ModalDelete;