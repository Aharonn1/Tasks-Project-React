import React from "react";
import "./Pagination.css";

const Pagination:React.FC<{totalPost: number,postPerPage: number,
    currentPage:number,setCurrentPage:(newPage:number) => void
 }> = ({totalPost,postPerPage,setCurrentPage,currentPage}) =>{
     
     const pageNumbers = [];
     for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
         pageNumbers.push(i)
     }
 
    return (
        <div className="Pagination">
            {
                pageNumbers.map((page,index)=>{
                    return <button key={index} onClick={() => setCurrentPage(page)} 
                    className =   {page === currentPage ? 'active' : ''} >{page}</button>
                })
            }
        </div>
    );
}
export default Pagination;