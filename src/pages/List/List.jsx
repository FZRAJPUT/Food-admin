import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => {
  const [list, setList] = useState([]);

  // const url = "http://localhost:4000";

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/deal/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching the list");
      }
    } catch (error) {
      toast.error("Error fetching the list");
      console.error("There was an error fetching the list!", error);
    }
  };


  const removeFood = async (foodId)=>{
      // console.log(foodId)
      const response = await axios.post(`${url}/api/deal/remove`,{id:foodId});
      await fetchList();
      if(response.data.success){
        toast.success(response.data.message);
      }
      else{
        toast.error("Error")
      }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All food list</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>image</b>
          <b>name</b>
          <b>category</b>
          <b>price</b>
          <b>action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className='list-table-format'>
            <img src={`${url}/images/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
