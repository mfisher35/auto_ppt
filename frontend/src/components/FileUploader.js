import React, { useState } from 'react';

function FileUploader() {
  const [file_pptx, setFilePptx] = useState(null);
  const [file_logo, setFileLogo] = useState(null);

  const onChangePptx = (event) => {
    setFilePptx(event.target.files[0]);
  };

  const onChangeLogo = (event) => {
    setFileLogo(event.target.files[0]);
  };


  const onSubmit = () => {
    // handle file submission here
  };

  return (
    <div>
      PPTX File: <input type="file" onChange={onChangePptx} /> <br/>
      <br/>
      Logo File: <input type="file" onChange={onChangeLogo} /> <br/>
      <br/>
      <br/>
      <center> <button onClick={onSubmit}>Submit</button> </center>
    </div>
  );
}

export default FileUploader;

