import React, {useEffect,useState} from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'
// import { withAlert } from 'react-alert'


const URL = process.env.REACT_APP_API_URL


function Bids() {
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const [bids,setBids] =useState("")
    const [winnerBids,setWinnerBids] =useState("")
    const [addBids,setAddBids] =useState("")
    const [Amount,setAmount] =useState("")
    const [Uid,setUid] =useState("")
    const [Itemid,setItemId] =useState("")
    const [winnerItemid,setWinnerItemId] =useState("")

    const getWinner = async ()=>{

        try {
                
            var response1 = await axios.get(`${URL}/winner/${winnerItemid}`)
            console.log("add response1121 : ",response1.data)
            if(response1.status === 200){
                setWinnerBids(response1)
                console.log(response1)
                // setBids(response.data)
                // await getBids()
                console.log("Bid submiited succesfully",winnerBids.data)
                alert(winnerBids.data)
                return(
                    <div>
                        
                    </div>
                )
                
                // console.log("bids : ",bids)
                
    
            }
            else{
                console.log("hello1")
            }
            // console.log("response : ",response)
            // console.log("response.data  : ",response.data)
    
        } catch (error) {
            console.log(error)
            
        }
        

    }
    
    const AddBids = async ()=>{
        console.log("hello")
        try {
                
            var response1 = await axios.post(`${URL}/bids/${Uid}/${Itemid}/${Amount}`)
            console.log("add response : ",response1)
            if(response1.status === 200){
                // setBids(response.data)
                // await getBids()
                console.log("Bid submiited succesfully")
                
                
                // console.log("bids : ",bids)
                
    
            }
            else{
                console.log("hello1")
            }
            // console.log("response : ",response)
            // console.log("response.data  : ",response.data)
    
        } catch (error) {
            console.log(error)
            
        }
        
    
    
    }
    const getAmount = ()=>{
        return(
            <div className="d-flex mb-3 align-items-center">
            <label className="me-3" for="username me-3">
              Amount:
            </label>
            <input
              className="p-1 w-100 rounded-3"
              type="text"
              placeholder="Amount"
              id="username"
              value={Amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
        )
    }
    const getitemid = ()=>{
        return(
            <div className="d-flex mb-3 align-items-center">
            <label className="me-3" for="username me-3">
              itemid:
            </label>
            <input
              className="p-1 w-100 rounded-3"
              type="text"
              placeholder="ItemId"
              id="username"
              value={Itemid}
              onChange={(e) => setItemId(e.target.value)}
              required
            />
          </div>
        )
    }
    const getWinneritemid = ()=>{
        return(
            <div className="d-flex mb-3 align-items-center">
            <label className="me-3" for="username me-3">
              itemid:
            </label>
            <input
              className="p-1 w-100 rounded-3"
              type="text"
              placeholder="ItemId"
              id="username"
              value={winnerItemid}
              onChange={(e) => setWinnerItemId(e.target.value)}
              required
            />
          </div>
        )
    }
    const getUid = ()=>{
        return(
            <div className="d-flex mb-3 align-items-center">
            <label className="me-3" for="username me-3">
              Uid:
            </label>
            <input
              className="p-1 w-100 rounded-3"
              type="text"
              placeholder="Amount"
              id="username"
              value={Uid}
              onChange={(e) => setUid(e.target.value)}
              required
            />
          </div>
        )
    }



    const getBids = async ()=>{
        try {
                
            var response = await axios.get(`${URL}/bids`)
            if(response.status === 200){
                setBids(response.data)
                console.log("bids : ",bids)
                
    
            }
            else{
                console.log("hello")
            }
            console.log("response : ",response)
            console.log("response.data  : ",response.data)
    
        } catch (error) {
            console.log(error)
            
        }
    
    
    }
    useEffect(() => {
        console.log("URL : ",URL)
        
        getBids();
        // AddBids()
        
    }, [])
    return (
        <center>
            <h1>Bid Tracker</h1>
        <div style={{backgroundColor:'#330e00'}}>
            
            {bids && bids.map((bid,index)=>{
                console.log("bid2 : ",bid)
                return(
                    
                    <div key={index} style={{padding:10}}>
                        <Card style={{ width: '18rem' }}>
  {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
  <Card.Body>
    <Card.Title>item {index+1}</Card.Title>
    <Card.Text>
        <p style={{fontWeight:'bold'}}>
        Bid By : {bid.userid}
        </p>
        <p>
           ItemId: {bid.itemid}
        </p>
    Amount: {bid.amount}
    </Card.Text> 
    {/* <Button variant="primary">Bid</Button> */}
  </Card.Body>
</Card>
                        
                        {/* {bid.userid} */}

                       
                    </div>
                    
                )
            })}
             <Card style={{ width: '18rem' }}>
  {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                            <Card.Body>
                                <Card.Title>Add Bid</Card.Title>
                                <Card.Text>
                                {getAmount()}
                                {getUid()}
                                {getitemid()}
                                <Button onClick={() => AddBids()}>Submit bid</Button>
                                   
                                </Card.Text> 
                                {/* <Button variant="primary">Bid</Button> */}
                            </Card.Body>
                            </Card>
            <div style={{paddingTop:10}}>

            <Button variant="primary" onClick={handleShow} >
        Check winner
      </Button>
            </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!
            {getWinneritemid()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=> getWinner()}>
            Show
          </Button>
        </Modal.Footer>
      </Modal>
            
        </div>
        </center>
    )
}

export default Bids
