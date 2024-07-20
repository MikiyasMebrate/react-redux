import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectedDataItem,
  fetchTableData,
  addNewData,
  updateDataRequest,
  deleteDataRequest
} from "./state/table/tableDataSlice";

import Table from "./components/ui/Table";
import Spinner from "./components/ui/Spinner";
import ModalAdd from "./components/ui/ModalAdd";

//Form
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import ToastMessage from "./components/ui/ToastMessage";
import ModalDelete from "./components/ui/ModalDelete";

const schema = yup.object({
  name: yup.string().required("Name is required").min(3),
  description: yup.string().required("Description is required").min(5),
});

function App() {
  
  //Redux
  const dispatch = useDispatch();
  const data = useSelector((state) => state.table.data);
  const err = useSelector((state) => state.table.err);
  const loading = useSelector((state) => state.table.loading);
  const selectedData = useSelector((state) => state.table.selectedData);


  //handle Selected selectedData
  const handleSelectedData = (data) => {
    dispatch(selectedDataItem(data));
  };

 
  //Toast
  const [showToast, setShowToast] = useState(false);
  const handleToast = () => setShowToast(!showToast);


  //response Message
  const [responseMessage, setResponseMessage] = useState(null);



  //Modal
  const [show, setShow] = useState({
    deleteModalShow: false,
    addModalShow: false,
    editModalShow: false,
  });

  //form
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleAddModal = () => {
    reset()
    setShow({ ...show, addModalShow: !show.addModalShow });
  };

  const handleDeleteModal = () => {
    
    setShow({ ...show, deleteModalShow: !show.deleteModalShow });
  };

  const handleEditModal = () => {
    setShow({ ...show, editModalShow: !show.editModalShow });
  };




  

  //handle on add new category added
  const handleOnSubmit = async (data) => {
    

    try {
      let response =  show.addModalShow ? await dispatch(addNewData(data)) : await dispatch(updateDataRequest(selectedData.id,data)) 
      handleToast();
      show.addModalShow ? handleAddModal() : handleEditModal()
      setResponseMessage(response);
      reset();
    } catch (error) {
      setResponseMessage(error.message);
    }
  };

     //form delete
  const {
      handleSubmit : handleSubmitDelete,
      reset : resetForm2
    } = useForm();


  
  const handleOnDeleteSubmit = async () =>{
    try{
      let response = await dispatch(deleteDataRequest(selectedData))
      handleToast();
      handleDeleteModal();
      setResponseMessage(response);
      resetForm2()
    }catch(error){
      setResponseMessage(error.message);
    }
  }


  return (
    
    <div className="m-5">
      {isSubmitted && (
        <ToastMessage
          message={responseMessage}
          color={"success"}
          header={"Category"}
          show={showToast}
          handleToast={handleToast}
        />
      )}

      <div className="row justify-content-center">
        <div className="col-md-8">
          <button
            disabled={loading}
            onClick={() => dispatch(fetchTableData())}
            className="btn btn-info"
          >
            {loading ? "Fetching" : "Reload"}
          </button>
          <button
            onClick={handleAddModal}
            className="btn btn-primary float-end"
          >
            Add Category
          </button>

          {loading && <Spinner />}
          {err && <h2 className="text-danger text-center">{err}</h2>}
          {data && !loading && (
            <Table
              handleSelectedData={handleSelectedData}
              data={data}
              handleEditModal = {handleEditModal}
              handleDeleteModal={handleDeleteModal}
              setValue = {setValue}
            />
          )}
          {data && !loading && (
            <ModalAdd
              form={
                <>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      placeholder=""
                      {...register("name")}
                    />
                    <label htmlFor="floatingInput">Name</label>
                    {errors.name && (
                      <p className="text-danger">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="form-floating">
                    <textarea
                      className={`form-control ${
                        errors.description ? "is-invalid" : ""
                      }`}
                      placeholder=""
                      style={{ height: "250px" }}
                      {...register("description")}
                    ></textarea>
                    <label htmlFor="floatingTextarea2">Description</label>
                    {errors.description && (
                      <p className="text-danger">
                      </p>
                    )}
                  </div>
                </>
              }
              handleModal={show.addModalShow ? handleAddModal : handleEditModal}
              show={show.addModalShow ? show.addModalShow : show.editModalShow}
              type = {show}
              handleOnSubmit={handleOnSubmit}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          )}

          <ModalDelete
            show={show.deleteModalShow}
            data={selectedData}
            handleDeleteModal={handleDeleteModal}
            handleSubmitDelete = {handleSubmitDelete}
            handleOnDeleteSubmit = {handleOnDeleteSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
