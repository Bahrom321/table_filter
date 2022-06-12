import axios from 'axios';
import React, {useEffect, useState} from 'react'
import "./App.css"
const App = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("")
  const [sortValue, setSortValue] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const [pageLimit] = useState(4)

  const sortOptions = ["title", "amount", "distance", "value"]

  useEffect(()=>{
    loadUserData(0, 4, 0)
  }, [])

  const loadUserData = async (start, end, increas) => {
    return await axios.get(`http://localhost:5000/users?_start=${start}&_end=${end}`)
    .then((response)=> {
      setData(response.data);
      setCurrentPage(currentPage + increas)
    })
    .catch((err)=> console.log(err));
  }
  // console.log("data", data);


    //reset users
  const handleReset = () => {
    loadUserData(0, 4, 0)
  }

    //search users input
  const handleSearch = async (e) => {
    e.preventDefault()
    return await axios.get(`http://localhost:5000/users?q=${value}`)
    .then((response)=> { 
        setData(response.data);
        setValue("")
      })
    .catch((err)=> console.log(err))
  }

  //select filter
  const handleSort = async (e) => {
    let value = e.target.value;
    setSortValue(value)
    return await axios.get(`http://localhost:5000/users?_sort=${value}&_order=asc`)
    .then((response)=> { 
        setData(response.data);
      })
    .catch((err)=> console.log(err))
  }

  //btn filter
  const handleFilter = async (value) => {
    return await axios
    .get(`http://localhost:5000/users?type=${value}`)
    .then((response)=> { 
        setData(response.data);
      })
    .catch((err)=> console.log(err))
  }

  const renderPagination = () => {
    if(currentPage === 0) {
      return(
      <div >
          <button className='btn_Next' onClick={() =>  loadUserData(4, 8, 1)}>Next</button>
          <span>1</span>
        
      </div>
      )
    } else if(currentPage < pageLimit - 1 && data.length === pageLimit) {
      return(
        <div >
            <button className='btn_Prev'  onClick={() =>  loadUserData((currentPage -1) * 4, currentPage * 4, -1)}>Prev</button>
            <span>{currentPage +1}</span>
            <button className='btn_Next' onClick={() =>  loadUserData((currentPage +1) * 4, (currentPage +2) * 4, 1)}>Next</button>
        </div>
        )
    }
    else {
      return(
          <div >
            <button className='btn_Prev' onClick={() =>  loadUserData(4, 8, -1)}>Prev</button>
            <span>{currentPage +1}</span>
          </div>
        )
    }
  }


  return (
    <div className="container">
    <div className='table-container'>
      <form action="#" 
      onSubmit={handleSearch}
      style={{margin:"auto"}}
      >
          <div className="search">
            <input 
              type="text" 
              placeholder='Search...'  
              value={value}
              onChange={(e) => setValue(e.target.value)}
              />
              <div>
                  <button  className='btn_input_search' type='submit' onClick={handleSearch}>search</button>
                  <button className='btn_input_reset' onClick={() => handleReset()}>reset</button>
              </div>
          </div>
      </form>
      <div className="filter_btn">
          <div className="#">
              <button onClick={() => handleFilter("expensive")}>expensive</button>
              <button onClick={() => handleFilter("cheap")}>cheap</button>
              <button onClick={() => handleFilter("average")}>average</button>
          </div>
          {/* <div className=""> */}
              <select onChange={handleSort} value={sortValue}>
                    <option>Please Select Value</option>
                    {sortOptions.map((item, index)=> (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
              </select>
          {/* </div> */}
      </div>
      <table className="table">
     <thead>
     	<tr>
     	 <th>Id</th>
     	 <th>Name</th>
     	 <th>Available goods</th>
     	 <th>Available goods</th>
     	 <th>Value of goods</th>
     	</tr>
     </thead>
     {data.length === 0 ? (
      
        <th>NO Data Found</th>
      
     ): (
      data.map((item, index) => (
        <tbody key={index}>
        <tr>
     	  	  <td data-label="Id">{index+1}</td>
     	  	  <td data-label="Name">{item.title}</td>
     	  	  <td data-label="Age">{item.amount}</td>
     	  	  <td data-label="Marks%">{item.distance}</td>
     	  	  <td data-label="Staus">{item.type}</td>
     	  </tr>
      </tbody>
      ))
     )}
   </table>
    <div className="#">
        {renderPagination()}
    </div>        
    </div>
    </div>
  )
}

export default App

