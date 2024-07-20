import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalAdd = ({handleModal, type,show, form, handleSubmit, handleOnSubmit, isSubmitting}) => {
  return (
    <>
      <Modal size="lg" show={show} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>{type?.editModalShow ? 'Update' : 'Add new'}  </Modal.Title>
        </Modal.Header>

        <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Modal.Body>
            {form}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModal}>
            Close
          </Button>
          <button disabled={isSubmitting} className="btn btn-primary" type="submit">{isSubmitting ? 'Loading' : type?.editModalShow ? 'Update' : 'Add'}</button>
        </Modal.Footer>
        </form>

      </Modal>
    </>
  );
};

export default ModalAdd;
