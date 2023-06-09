import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footertest from './Footertest'
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useHistory } from 'react-router-dom';

const ViewAR = () => {
    const productdetailsurl= 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/getproducttable'
    const [allproducts, setAllProducts] = useState()
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState([]);
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0)

    
   const history = useHistory()
    useEffect(()=>{
      axios.get(productdetailsurl).then(res=>{
        setAllProducts(res.data)
      
        setPageCount(Math.ceil(res.data.length / perPage))
       
      }).catch(error=>{
        console.log(error)
      })  

    },[])
 


    const slice = allproducts && allproducts.slice(offset, offset + perPage)

   
    const handlePageClick=(e)=>{
        const selectedPage = e.selected;
        
        
        setOffset(selectedPage*10)

       
    }
    const handleDetails=(item)=>{

        if(item.modelrequired === 'true'){
            history.push({
                pathname: '/details',
                state: item.product_Id
            })
        }
      if(item.modelrequired === 'false'){
        history.push({
            pathname: '/webdetails',
            state: item
        })
      }
    }

   
  return (
    <div>
       <Navbar/>

        <div className='arviewcontainer'>
            <div className='arproductscontainer'>
                {
                    slice && slice.map(item=>(
                        <div>
                        <div className='arproductcard'>
                               
                           <img src={item.imageurl[0]}/>
    
                             <button onClick={()=>handleDetails(item)}>View Details</button>
         
                           
    
                        </div>
       
                    </div>
                    

                    ))
                    
                }
              
          
                
              


            </div>
            <div className='paginationcontainer'>
            <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"paginationar"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>

            </div>
       
      

        </div>
        <Footertest/> 
      
    </div>
  )
}

export default ViewAR
