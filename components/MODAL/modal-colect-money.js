import React from 'react' 
import Modal from 'react-modal' 
import AlertMessage from '../ALERT/alert-message'
import uuidv1 from 'uuid/v1'
 
const customStyles = {
  content : {
    margin:  'auto',
    width: '50%',
    height: 'auto', 
    top: '20px', 
    bottom: 'auto', 
  },
  h1: { 
    textAlign: 'center',
    fontSize: 30
  },
  hideAlert: {
    display: 'none'
  },
  showAlert: {
    display: 'block'
  }
}; 
 
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
 Modal.setAppElement('body')
 
export default class ModalCollectMoney extends React.Component {

  constructor(props) {
    super(props); 
    this.state = {
      modalIsOpen: false,
      modalErrorIsOpen: false,
      showAlert: false 
    }
 
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this) 
    this.handleReleaseBill = this.handleReleaseBill.bind(this)
    this.hideAlertMsg = this.hideAlertMsg.bind(this)     
  } 

  openModal() {
    this.setState({modalIsOpen: true});
  }
 
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }

  // the rest I have to get from the customer (or to give back to the customer)
  restValue() {
    if( this.props.restToCashed === '' ) {
      return this.props.totalBill  
    } else {
      return this.props.restToCashed
    }
  }
 
  // from footer (where It's displayed the total cashed and the rest)
  footerTotal() {
      return (
        <div>
          <p className="paragraph-cashed">
            <label className="left">Total incasat: </label>
            <label className="right"> { parseFloat(this.props.totallyCashed).toFixed(2) } </label>
          </p>
          <p className="paragraph-rest" style={{ color: this.props.labelColor }}>
            <label className="left"> { this.props.restLabel } </label>
            <label className="right"> { parseFloat(this.restValue()).toFixed(2)  } </label>
          </p>
        </div>
      )
  }
 
  // show the final form only if there are products in the cart
  onClickOpenModalForm() {
    if(this.props.totalBill > 0) { 
      return this.openModal
    }else{
      return this.props.showAlertMsg  
    } 
  }

  hideAlertMsg() {
    this.setState({ showAlert: false })  
  }

  // function to release the receipt
  releaseBill() {  
    // get shopping cart from localStorage
    const params =  { 
        'param': JSON.parse(localStorage.getItem('billProducts'))    // this.state.currentComponent
    }
    // generate an uniqueId for each receipt
    params.uuid = uuidv1() 

    //  axios.post('/api/download', params)   
    axios.post('/api/receipt', params)
      .then(resp => { 
        console.log(resp.data)
           this.theBillWasReleased
           window.open('/descarca')  
      })
      .catch(error => console.log(error)) 
 
      // after release the receipt do the following:
      this.setState({ 
        modalIsOpen: false, // close modal
        showAlert: false // close alert (if it's open)
      }); 
      this.props.clearColectMoneyForm() // clear form
      this.props.clearShoppingCart() // remove products from cart & display a success message    
  }
  
  // handle function to release the receipt for the customer 
  handleReleaseBill() { 
    if(this.props.restLabel == 'Rest de incasat' && this.restValue() > 0) { 
        this.setState({ showAlert: true })  
    } else { 
        this.setState({ showAlert: false })  
        return  this.releaseBill() 
    }
  } 

  render() {
    return (
      <div> 
        <button onClick={ this.onClickOpenModalForm() }               
                data-value="collectMoney" 
                className="btn btn-primary btn-block"> 
            Incaseaza 
        </button>
        
        <Modal
          isOpen={this.state.modalIsOpen}
          style={customStyles} 
        >
          <h2 style={customStyles.h1} ref={subtitle => this.subtitle = subtitle}>Incaseaza</h2>          
          <br />          
          <button className="close-modal" onClick={this.closeModal}>&times;</button>
 
          {
            this.state.showAlert 
            ? <AlertMessage alertModel='alert-danger' 
                          onClickHide={this.hideAlertMsg }
                          message='Nu ati incasat toata suma!'                        
            />  
            : null
          } 
          
          <h2>Total de plata: { parseFloat(this.props.totalBill).toFixed(2) }</h2>
          <br />
 
          <div className="modalColectMoney"> 
              <div className="form-group input-container">
                  <span className="icon-modal-colect">NUMERAR</span>
                  <input type="number" 
                         className='form-control' 
                         name="price"    
                         onChange={this.props.handleCollectCashInput}     
                         value={ this.props.collectCashInput }   
                  />
              </div>

              {/* <div className="form-group input-container">
                  <span className="icon-modal-colect">RO</span>
                  <input className='form-control' 
                    name="cif"   
                    readOnly              
                  />
              </div> */}
              
              <br />
              <br />

              <div className="row">
                  <div className="col-md-8">
                    <span>
                      { this.footerTotal() }
                    </span>
                  </div>
                  
                  <div className="col-md-4">
                    <button className="btn btn-info btn-block"
                            onClick={this.handleReleaseBill}
                    >
                        EMITE BON 
                    </button>
 
                  </div>                   
              </div>
          </div>
        </Modal>
      </div>
    )
  }
}
  