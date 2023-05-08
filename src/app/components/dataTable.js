import { useState } from "react";

export default function DataTable(props){
    const filteredData = props.filteredData
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
  
    // Calculate pagination values
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  
    if(filteredData.length > 0){
    return( 
    <>    
    <div>
        <table className="table risk-table table-striped table-bordered table-hover h-48">
            <thead>
                <tr>
                <th>Asset Name</th>
                <th>Business Category</th>
                <th>Risk Rating</th>
                <th>Risk Factors</th>
                </tr>
            
            </thead>
            <tbody>
                {currentRows.map((data, index) => (
                      <tr key={`tr-${index}`}>
                      <td>{data['Asset Name']}</td>
                      <td>{data['Business Category']}</td>
                      <td>{data['Risk Rating']}</td>
                      <td>{data['Risk Factors']}</td>
                  </tr>
                )) }
            </tbody>

        </table>
             <div className="pagination">
             <ul className="pagination">
               {Array(Math.ceil(filteredData.length / rowsPerPage))
                 .fill()
                 .map((_, index) => (
                   <li key={index} className={`page-item${index + 1 === currentPage ? ' active' : ''}`}>
                     <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                       {index + 1}
                     </button>
                   </li>
                 ))}
             </ul>
           </div>
    </div>
    </>
) 
}
}