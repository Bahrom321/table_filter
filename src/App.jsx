import axios from 'axios';
import React, {useEffect, useState} from 'react'
import "./App.css";
import List from './components/List';

const App = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("")
  const [sortValue, setSortValue] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const [pageLimit] = useState(3)
  const [sortFilterValue, setSortFilterValue] = useState("")
  const [operation, setOperation] = useState("")

  useEffect(()=>{
    loadUserData(0, 3, 0)
  }, [])

  const loadUserData = async (start, end, increas, optType=null, filterOrSortValue) => {
    switch (optType) {
      case "search" :
        setOperation(optType);
        setSortValue("");
          return await axios.get(`http://localhost:5000/users?q=${value}&_start=${start}&_end=${end}`)
          .then((response)=> { 
              setData(response.data);
              setCurrentPage(currentPage + increas)
            })
          
          case "filter" :
            setOperation(optType);
            setSortFilterValue(filterOrSortValue);
             return await axios.get(`http://localhost:5000/users?type=${filterOrSortValue}&_order=asc&_start=${start}&_end=${end}`)
              .then((response)=> { 
                  setData(response.data);
                  setCurrentPage(currentPage + increas)
                })

          default:
            return await axios.get(`http://localhost:5000/users?_start=${start}&_end=${end}`)
            .then((response)=> {
              setData(response.data);
              setCurrentPage(currentPage + increas)
            })
    }
  }


    //reset users
  const handleReset = () => {
    setOperation("");
    setValue("");
    setSortFilterValue("");
    setSortValue("");
    loadUserData(0, 3, 0);
  }

    //search users input
  const handleSearch = async (e) => {
    e.preventDefault();
    loadUserData(0, 3, 0, "search")
    // return await axios.get(`http://localhost:5000/users?q=${value}`)
    // .then((response)=> { 
    //     setData(response.data);
    //     setValue("")
    //   })
  }

  //select filter
  const handleFilter = async (value) => {
    loadUserData(0, 4, 0, "filter", value)
  }

  const renderPagination = () => {
    if(data.length < 3 && currentPage === 0) return null;
    if(currentPage === 0) {
      return(
      <div >
          <button className='btn_Next' onClick={() =>  loadUserData(3, 6, 1, operation, sortFilterValue)}>Next</button>
          <span>1</span>
        
      </div>
      )
    } else if(currentPage < pageLimit - 1 && data.length === pageLimit) {
      return(
        <div >
            <button className='btn_Prev'  onClick={() =>  loadUserData((currentPage -1) * 3, currentPage * 3, -1, operation, sortFilterValue)}>Prev</button>
            <span>{currentPage +1}</span>
            <button className='btn_Next' onClick={() =>  loadUserData((currentPage +1) * 3, (currentPage +2) * 3, 1, operation, sortFilterValue)}>Next</button>
        </div>
        )
    }
    else {
      return(
          <div >
            <button className='btn_Prev' onClick={() =>  loadUserData((currentPage -1) *3, currentPage * 3, -1, operation, sortFilterValue)}>Prev</button>
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
              placeholder='Search Name...'  
              value={value}
              onChange={(e) => setValue(e.target.value)}
              />
              <div>
                  <button  className='btn_input_search' type='submit' onClick={handleSearch}>search</button>
                  <button className='btn_input_reset' onClick={() => handleReset()}>reset</button>
              </div>
          </div>
      </form>
      {data.length > 0 &&(
        <div className="filter_btn">
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown button
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><a className="dropdown-item" href="#" onClick={() => handleReset()}>All</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => handleFilter("mobile")}>Mobile</a></li>
                <li><a className="dropdown-item" href="#" onClick={() => handleFilter("laptop")}>Laptop</a></li>
                <li><a className="dropdown-item" href="#" onClick={() => handleFilter("car")}>Car</a></li>
                <li><a className="dropdown-item" href="#" onClick={() => handleFilter("city")}>City</a></li>
              </ul>
            </div>
        </div>
      )}
    <div className="row row-cols-1 row-cols-md-3 g-4">
     {data.length === 0 ? (
        <h1>NO Data Found</h1>
     ): (
      data.map((item) => (
        <>   
          <List item={item} key={item.id}/>
        </>

      ))
     )}
    </div>
    <div className="#">
        {renderPagination()}
    </div>        
    </div>
    </div>
  
  )
}

export default App

