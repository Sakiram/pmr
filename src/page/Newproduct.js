// import {faCloudArrowUp} from '@fortawesome/fontawesome'
// import {faCloudArrowUp} from '@awesome.me/kit-KIT_CODE/icons'
import React, { useState } from 'react'
import { ImagetoBase64 } from '../utility/ImagetoBase64'
import { toast } from 'react-hot-toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Newproduct = () => {
  const [data,setData] = useState({
    name : "",
    category : "",
    image : "",
    price : "",
    description : ""
  })

  const handleOnChange = (e)=>{
    const {name,value} = e.target

    setData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
  }

  const uploadImage = async(e)=>{
    const data = await ImagetoBase64(e.target.files[0])
    // console.log(data)

    setData((preve)=>{
      return{
        ...preve,
        image : data
      }
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log(data)

    const {name,image,category,price} = data
    if(name && image && category && price){
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/uploadProduct`,{
        method : "POST",
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })
  
      const fetchRes = await fetchData.json()
  
      console.log(fetchRes)
      toast(fetchRes.message)

      setData(()=>{
        return{
          name : "",
          category : "",
          image : "",
          price : "",
          description : ""
        }
      })
    }
    else{
      toast("Enter required field")
    }
    
  }

  return (
    <div className='p-4'>
      <form className='m-auto w-full max-w-md shadow flex flex-col p-3 bg-white' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input type={"text"} name='name' className='bg-slate-200 p-1 my-1 bg-slate-800' onChange={handleOnChange} value={data.name} placeholder='Enter product name'/>

        <label htmlFor='category'>Category</label>
        <select className='p-1 my-1 bg-slate-800 text-slate-400' id='category' name='category' onChange={handleOnChange} value={data.category}>
          <option value={"other"}>select category</option>
          <option value={"Cement"}>Cement</option>
          <option value={"Rebars"}>Rebars</option>
        </select>

        <label htmlFor='image'>Image
        <div className='h-40 w-full bg-slate-800 rounded flex items-center justify-center cursor-pointer'>
          {
            data.image ? <img src={data.image} className='h-full'/> : <span className='text-5xl'><FontAwesomeIcon icon="fa-solid fa-cloud-arrow-up" style={{color: "#FFD43B",}} /></span>
          }
          
          
          <input type={"file"} accept='image/*' id='image' onChange={uploadImage} className='hidden'/>
        </div>
        </label>

        <label htmlFor='price' className='my-1'>Price</label>
        <input type={"text"} className='p-1 my-1 bg-slate-800 text-white-800' name='price' onChange={handleOnChange} value={data.price} placeholder='Enter price per [Ton]'/>

        <label htmlFor='price' className='my-1'>Availability</label>
        <input type={"text"} className='bg-slate-800 text-white-800 p-1 my-1' name='availability' onChange={handleOnChange} value={data.availability} placeholder='Enter availability'/>

        <label htmlFor='description'>description</label>
        <textarea rows={2} value={data.description} className='bg-slate-800 text-white-800 p-1 my-1 resize-none' name='description' onChange={handleOnChange} placeholder='Handle description'></textarea>

        <button className='bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow'>Save</button>
      </form>
    </div>
  )
}

export default Newproduct