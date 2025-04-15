import React, { useEffect, useState } from 'react';
import { CiStar } from 'react-icons/ci';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import Addpro from '../components/Addpro.jsx';
import useProduct from '../../others/useProduct.jsx';
import toast from 'react-hot-toast';
import skr from "./../assets/skr.jpg"
const Feature = () => {
  let [id, setId] = useState(null);
  /* new */
  let [name,setName]=useState('')
  let [describtion,setDescribtion]=useState('')
  let [price,setPrice]=useState('')
  let [image,setImage]=useState(null);
  let {fetchSingle}=useProduct();
  let [loading,setLoading]=useState(false);
  let handleVisible = async(pid) => {
    console.log("id",pid)
    setId(pid);
     try{
          console.log("execute")
          if(!pid)return
          setLoading(true)
          let singleProduct=await fetchSingle(pid);
          console.log(pid,singleProduct)
          setName(singleProduct?.name);
          setDescribtion(singleProduct?.describtion);
          setPrice(singleProduct?.price);
          setImage(singleProduct?.image);
          console.log(singleProduct)
          }catch(err){
            toast.error(err?.message);
          }
          finally{
            setLoading(false)
          }
  };
  let handleChangePrice=(amount)=>{
    setPrice(amount)
  }
  let handleChangeDescribtion=(describtion)=>{
    setDescribtion(describtion)
  }
  let handleChangeName=(name)=>{
    setName(name)
  }
  let handleImageChange=(img)=>{
    setImage(img)
  }

  let { isFetching, products, fetchAllproduct,deleteProduct,updateFeature } = useProduct();
  let handleDelete=async(id)=>{
    try{
      await deleteProduct(id)
      setId(null)
    }catch(err){
      toast.error(err?.message||"failed to delete");
    }
  }
  let handleFeature=async(id)=>{
    try{
      await updateFeature(id)
    }catch(err){
      toast.error(err?.message||"failed to update as feature")
    }
  }
  useEffect(() => {
    let fetch = async () => {
      try {
        await fetchAllproduct();
      } catch (err) {
        toast.error(err?.message);
      }
    };
    fetch();
    console.log("table",products)
  }, [id]);

  return (
    <div className="w-full h-full flex justify-center items-center p-4 relative">
      <div className="w-[720px] max-w-4xl h-[80%] bg-[#0a2636] hover:bg-gray-900 transition-all duration-300 ease-linear rounded-lg shadow-lg shadow-black overflow-hidden">
        <div className="overflow-y-auto max-h-[500px] scroll">
          <table className="w-full text-left text-white">
            <thead className="bg-gray-700 sticky top-0 left-0 text-sm font-semibold uppercase h-12">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Feature</th>
                <th className="px-4 py-2">Remove</th>
                <th className="px-4 py-2">Update</th>
              </tr>
            </thead>
            <tbody>
              {isFetching ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : products && products.length > 0 ? (
                products.map((item) => (
                  <tr
                    className="border-b border-gray-700 hover:bg-gray-800 transition duration-200 cursor-pointer"
                    key={item._id} 
                  >
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">
                      <img
                        src={item?.image || skr} 
                        alt={item.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-4 py-3 flex items-center gap-1">
                      <FaIndianRupeeSign /> <span>{item.price}</span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {item.describtion?item.describtion.length > 10
                        ? item.describtion.slice(0, 10) + "..."
                        : item.describtion:"no describtion"}
                    </td>
                    <td className="px-4 py-3">
                      <button className={`text-yellow-400 hover:text-yellow-500 text-xl`} onClick={()=>handleFeature(item?._id)}>
                        <CiStar className={`${item?.isFeatured?"bg-yellow-400 text-black rounded-full":""}`}/>
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-red-500 hover:text-red-600 text-xl" onClick={()=>handleDelete(item?._id)}>
                        <MdDelete />
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        className="text-blue-400 hover:text-blue-500 text-xl"
                        onClick={() => handleVisible(item._id)}
                      >
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {id && <Addpro id={id} handleVisible={setId} name={name} loading={loading} describtion={describtion} price={price} image={image} handleChangeName={handleChangeName} handleChangePrice={handleChangePrice} handleChangeDescribtion={handleChangeDescribtion} handleImageChange={handleImageChange}/>}
    </div>
  );
};

export default Feature;
