import React, { useState } from 'react';
import { handleSubmission } from './API';

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
    if(!file_pptx || !file_logo)
      alert('Please choose your PPTX and logo files')
    else if(file_pptx['name'].toLowerCase().indexOf(".pptx") < 0)
      alert('Please choose a valid PPTX file')
    else {
       console.log(file_pptx['name'])
       handleSubmission(file_pptx,file_logo)
       // handle file submission here
   }
  };

  return (
    <div>
      PPTX File: <input type="file" accept=".pptx" onChange={onChangePptx} /> <br/>
      <br/>
      Logo File: <input type="file" accept=".jpg, .png, .jpeg, .gif" onChange={onChangeLogo} /> <br/>
      <br/>
      <br/>
      <center> <button onClick={onSubmit}>Submit</button> </center>
    </div>
  );
}

export default FileUploader;

