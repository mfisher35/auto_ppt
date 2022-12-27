const apiHost = "http://127.0.0.1:5005"

export const handleSubmission = (pptxFile,logoFile) => {
  const formData = new FormData();

  formData.append('pptx_file', pptxFile);
  formData.append('logo_file', logoFile);

  fetch(apiHost + '/process',
    {
        method: 'POST',
        body: formData,
    }).then((result) => result.blob()).then(blob => {
        var myURL = window.URL || window.webkitURL 
        var fileURL = myURL.createObjectURL(blob);
        var fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.download = 'processed.pptx';
        fileLink.click()
      })
      .catch((error) => {
          console.error('Error:', error);
      });
}
