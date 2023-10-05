import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";


export const Task = () => {
  const {id} =useParams()

  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/v1/tasks/${id}`)
      .then((res) => {
        console.log(res);
        setTaskData(res.data.data.task);
        console.log(res.data.data.task)


      })
      .catch((err) => {
        alert("something went wrong");
        console.log(err);
      });
  }, [id]);



  return (
    <div className='grid place-items-center gap-2 '>
      <h2 className='text-center mb-6 text-3xl pt-4 font-medium '>Task Details</h2>

      <table className='w-6/12 shadow-md '>
        <thead className='bg-gray-50 border-b-2 border-gray-200'>
          <tr>
            <th className='p-3 text-md font-semibold tracking-wide text-center'>Name</th>
            <th className='p-3 text-md font-semibold tracking-wide text-center'>Description</th>
            <th className='p-3 text-md font-semibold tracking-wide text-center'>StartDate</th>
            <th className='p-3 text-md font-semibold tracking-wide text-center'>EndDate</th>
          </tr>
        </thead>
        <tbody>
          <tr className='bg-white'>  
            <td className='p-3 text-sm text-gray-700 text-center'>{taskData?.name} </td>
            <td className='p-3 text-sm text-gray-700  text-center'>{taskData?.description} </td>
            <td className='p-3 text-sm text-gray-700 text-center '>{taskData?.startDate?.replace("T00:00:00.000Z","")} </td>
            <td className='p-3 text-sm text-gray-700  text-center'>{taskData?.endDate?.replace("T00:00:00.000Z","")} </td>

             </tr>
        </tbody>
      
      </table>

    </div>
    
  )
}
