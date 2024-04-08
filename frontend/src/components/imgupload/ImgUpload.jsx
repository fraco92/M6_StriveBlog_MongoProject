import React, { useState } from "react";
import { useStatus } from "react-use-status";

const ImgUpload = (props) => {
  const fileUpload = useStatus(null);

  const onFileChange = (event) => {
    // Update the state
    fileUpload(event.target.files[0]);
  };

  // On file upload (click the upload button)
  const onFileUpload = (e) => {
    e.preventDefault();
    console.log(fileUpload());
    if (fileUpload()) {
      fetch("http://localhost:3030/authors/660847a67371fbd1389da553/avantar", {
        method: "POST",
        body: JSON.stringify(fileUpload()),
      });
    }
  };

  return (
    <>
      <div style={{ margin: "150px" }}>
        <h1>UPLOAD IMG</h1>
        <div>
          <input type="file" onChange={onFileChange} />
          <button onClick={onFileUpload}>Upload!</button>
        </div>
      </div>
    </>
  );
};

export default ImgUpload;
