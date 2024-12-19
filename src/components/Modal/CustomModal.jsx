import React from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "./Modal.scss"; // Import SCSS for styling

// Shared Modal Component
const CustomModal = ({
  show,
  onClose,
  title,
  bodyContent,
  footerButtons,
  size,
}) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      size={size}
      className="custom-modal"
    >
      <Modal.Header closeButton className="custom-modal-header">
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="custom-modal-body">{bodyContent}</Modal.Body>
      <Modal.Footer className="custom-modal-footer">
        {footerButtons.map((button, index) => (
          <Button
            key={index}
            variant={button.variant || "primary"}
            onClick={button.onClick}
          >
            {button.label}
          </Button>
        ))}
      </Modal.Footer>
    </Modal>
  );
};

CustomModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  bodyContent: PropTypes.node.isRequired, // Can be form, image, or any React element
  footerButtons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      variant: PropTypes.string, // e.g., "primary", "secondary"
    })
  ).isRequired,
  size: PropTypes.oneOf(["sm", "lg", "xl"]),
};

export default CustomModal;
