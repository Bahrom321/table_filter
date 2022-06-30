import React, {useState} from 'react';
import ListItem from './ListItem';
import Modal from 'react-modal'

const List = ({item}) => {
    const [modalImg, setModalImg] = useState(false)
  return (
  <div className="col">
    <div className="card">
      <img 
       src={item.img} 
       className="card-img-top"
       height="250px" alt="..." 
       onClick={() => setModalImg(true)}
       />
       <Modal 
        isOpen={modalImg}
        onRequestClose={() => setModalImg(false)}
        style={{
            overlay:{
                backgroundColor:"gray"
            }
        }}
        >
        <img 
       src={item.img} 
       className="card-img-top"
       alt="..."
       width="100%"
       height="100%"
       style={{objectFit: "cover"}} 
       onClick={() => setModalImg(false)} 
       />
     </Modal>
      <div className="card-body">
        <h5 className="card-title">{item.title}</h5>
        
      </div>
          <ListItem item={item}/>      
    </div>
  
</div>

)
}

export default List;