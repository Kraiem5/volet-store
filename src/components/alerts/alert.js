import React from 'react'
import { useState } from 'react';
import { Alert } from 'react-bootstrap'

const AlertMessage = (res) => {
  console.log(res);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  
  return (
    <div>
    {res.res === true && (
      <Alert variant="success" onClose={() => setShowErrorAlert(false)} dismissible>
        <Alert.Heading>Hey, nice to see you</Alert.Heading>
        <p>
          Aww yeah, you successfully read this important alert message. This
          example text is going to run a bit longer so that you can see how
          spacing within an alert works with this kind of content.
        </p>
        <hr />
        <p className="mb-0">
          Whenever you need to, be sure to use margin utilities to keep things
          nice and tidy.
        </p>
      </Alert>
    )}
    {res.res === false&& (
      <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          Change this and that and try again. Duis mollis, est non commodo
          luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
          Cras mattis consectetur purus sit amet fermentum.
        </p>
      </Alert>
    )}

  </div>
  )
}

export default AlertMessage