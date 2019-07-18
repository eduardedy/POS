import React from 'react' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icon from '@fortawesome/free-solid-svg-icons'
 
export default class FormEdit extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            productName: "",
            barcode: "",
            price: ""
        }
        this.handleInput = this.handleInput.bind(this)
        this.editProduct = this.editProduct.bind(this)
    }

    componentDidMount() {
         axios.get('/api/receipt/'+this.props.match.params.id)
            .then( response => {  
                this.setState({  
                    productName: response.data[0].name,
                    barcode: response.data[0].code,
                    price: response.data[0].price               
                })                       
            })
            .catch( error => console.log(error) ) 
    }

    handleInput(e) {
        let name = e.target.name
        let value = e.target.value
        this.setState({ [name]: value })
    }
 
    editProduct(e) {
        e.preventDefault() 
        let {productName,barcode,price: productPrice} = this.state

        const params = {
            productName: productName,
            barcode: barcode,
            price: productPrice
        }
        
        axios.put('/api/product/'+this.props.match.params.id, params)
        .then( response =>  console.log(response.data) )
        .catch( error => console.log(error) )

        this.props.history.push('/nomenclator')
        
    }


    render() {
        return(
            <div className="container"> 
                <div className="container-sales"> 
                    <div className="justify"> 
                        <form onSubmit={this.editProduct}>
                            <p className="title-add-product">Editeaza un nou produs</p> 
 
                            <div className="form-group input-container">
                                <i className="icon"> <FontAwesomeIcon icon={icon.faArchive} /> </i>      
                                {/* <i className="fa fa-archive icon"></i> */}
                                <input className='form-control' type="text" 
                                 placeholder="Produs" 
                                 name="productName" 
                                 value={this.state.productName} 
                                 onChange={this.handleInput} 
                                 />
                            </div>

                            <div className="form-group input-container">
                                <i className="icon"> <FontAwesomeIcon icon={icon.faBarcode} /> </i>
                                <input className='form-control' 
                                 placeholder="Barcode" 
                                 name="barcode"
                                 value={this.state.barcode}
                                 onChange={this.handleInput}
                                 />
                            </div>

                            <div className="form-group input-container">
                                <i className="icon"> <FontAwesomeIcon icon={icon.faCreditCard} /> </i>
                                <input className='form-control'
                                 placeholder="Pret" 
                                 name="price"
                                 value={this.state.price}
                                 onChange={this.handleInput}
                                 />
                            </div>

                            <div className="form-group">
                                <button type="submit" className="btn btn-info btn-block">Editeaza</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}