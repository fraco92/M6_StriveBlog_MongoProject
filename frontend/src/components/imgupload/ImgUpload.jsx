const ImgUpload = (props) => {
  return (
    <>
      <form
        action="http://localhost:3030/authors/660847a67371fbd1389da553/avantar"
        method="POST"
        encType="multipart/form-data"
        style={{ margin: "150px" }}
      >
        <h1>UPLOAD IMG</h1>
        <div>
          <input type="file" onChange={onFileChange} />
          <button onClick={onFileUpload}>Upload!</button>
        </div>
      </form>
    </>
  );
};

export default ImgUpload;
