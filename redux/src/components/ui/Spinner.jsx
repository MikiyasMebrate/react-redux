const Spinner = () => {
    return (
      <div className="d-flex justify-content-center text-primary" >
        <div className="spinner-grow" style={{width : "2rem", height : "2rem"}} role="status">
          <span className="visually-hidden"></span>
        </div>
      </div>
    );
  };
  
  export default Spinner;
  