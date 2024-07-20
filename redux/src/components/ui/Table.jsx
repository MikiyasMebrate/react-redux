import formattedDate from '../../utility/dateFormatter'

const Table = ({ data,handleEditModal, setValue ,handleDeleteModal, handleSelectedData}) => {
  const handleOnDeleteData = (data)=>{
    handleSelectedData(data);
    handleDeleteModal()
  }

  const handleOnEditData = (data)=>{
    handleSelectedData(data);
    handleEditModal()
    setValue("name", data.name)
    setValue("description", data.description)
  }
  const dataList = data.categories.map((item, index) => (
    <tr key={item.id}>
      <td>{index + 1}</td>
      <td>{item.name}</td>
      <td>{item.description}</td>
      <td>{formattedDate(item.created_at)}</td>
      <td>
        <div className="btn-group gap-2">
          <div onClick={()=>handleOnEditData(item)} className="btn btn-primary btn-sm">Edit</div>
          <div  onClick={()=>handleOnDeleteData(item)} className="btn btn-danger btn-sm">Delete</div>
        </div>
      </td>
    </tr>
  ));

  return (
    <>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Created at</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>{dataList.length > 0 ? dataList : <td colSpan={5} className='text-danger text-center'>No data Found</td>}</tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
