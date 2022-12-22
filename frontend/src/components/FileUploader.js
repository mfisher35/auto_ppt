import React, { useState } from 'react';

function FileUploader() {
  const [file, setFile] = useState(null);

  const onChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onSubmit = () => {
    // handle file submission here
  };

  return (
    <div>
      <input type="file" onChange={onChange} />
      {file && <p>File name: {file.name}</p>}
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
}

export default FileUploader;

