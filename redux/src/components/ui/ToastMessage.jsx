import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const ToastMessage = ({ show, handleToast, message, color, header }) => {
  return (
    <ToastContainer position="top-end">
      <Row>
        <Col xs={12}>
          <Toast
            bg={color}
            onClose={() => handleToast()}
            show={show}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">{header}</strong>
            </Toast.Header>
            <Toast.Body className="text-light">
              {message}
            </Toast.Body>
          </Toast>
        </Col>
      </Row>
    </ToastContainer>
  );
};

export default ToastMessage;
