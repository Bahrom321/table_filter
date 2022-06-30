import React from 'react'
import { useState } from 'react'
import Modal from 'react-modal'

const ListItem = ({item}) => {
  
    const [modalOpen, setModalOpen] = useState(false)
  
    return (
    <div>
        <button onClick={() => setModalOpen(true)} className="btn btn-info">See More</button>
     <Modal 
     isOpen={modalOpen}
     onRequestClose={() => setModalOpen(false)}
     style={{
        overlay:{
            backgroundColor:"gray"
        }
        ,
        content:{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }
     }}
     >
        <div className="listItem">
            <div className="card mb-3" style={{
                 border:"none",
                 margin:"auto",
                 width:"80%"
                 }}>
                <div className="row g-0"  style={{width:"100%"}}>
                    <div className="col-md-4">
                    <img src={item.img} className="img-fluid rounded-start" alt="..."/>
                    </div>
                    <div className="col-md-8">
                    <div className="card-body">
                        <h1 className="card-title">{item.title}</h1>
                        <p className="card-text" >{item.descreption}</p>
                        <h4>Prece : {item.price} $</h4>
                        <button onClick={() => setModalOpen(false)} className="btn btn-danger">Close</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
     </Modal>
    </div>
  )
}



export default ListItem

