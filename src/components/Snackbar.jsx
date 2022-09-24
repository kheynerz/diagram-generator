import React from 'react'

import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import { useState } from 'react';


export const Snackbar = ({delay = 2500, variant = 'Info', header, body}) => {
  const [show, setShow] = useState(true)

  return (
    <ToastContainer className="p-3" position='bottom-end'>
    <Toast onClose={() => setShow(false)} show={show} delay={delay} autohide>
      <Toast.Header>
        <img
          src="holder.js/20x20?text=%20"
          className="rounded me-2"
          alt=""
        />
        <strong className="me-auto">{header}</strong>
      </Toast.Header>
      <Toast.Body>{body}</Toast.Body>
    </Toast>
  </ToastContainer>
  )
}
