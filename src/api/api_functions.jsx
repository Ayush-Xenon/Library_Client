import React from 'react'
import axios from 'axios'

const url='http://localhost:8081/'
const token = localStorage.getItem('token');
export const GetLibrary=async()=> {
  try{
    const res =await axios.get(`${url}libraries`,{
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    // console.log("kjhdfbjkhbv5jcf")
    // console.log(res.data);
    return res.data;
  }
  catch{
    return{
      message:"NO DATA FOUND"
    }
  }
};


// export const Enroll=async(lib_id)=> {
//   try{
//     const res =await axios.post(`${url}auth/library/enroll`,{
//       "LibraryId":lib_id
//     },{
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       }
//     });
//     // console.log("kjhdfbjkhbv5jcf")
//     // console.log(res.data);

//     console.log(res.data)
//     return res;
//   }
//   catch(error){
//     var a=(error)
//     return {a};
//   }
// };

export const Enroll = async (lib_id) => {
  try {
    const res = await axios.post(`${url}auth/library/enroll`, {
      "LibraryId": lib_id
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
   console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    //console.error("Error enrolling in library:", error);
    var a=error.response.data.error
    return  a ;
  }
};
