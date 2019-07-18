import React from 'react'
import FormInput from '../FORM/FormInput'
import FormErrors from '../FORM/FormErrors'
import AlertMessage from '../ALERT/alert-message'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icon from '@fortawesome/free-solid-svg-icons'
 
export default class Form extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            productName: "",
            barcode: "",
            price: "",

            productNameValid: false,
            barcodeValid: false,
            priceValid: false,

            formValid: false,
            formErrors: {productName: "", barcode: "", price: ""},

            showAlert: false,
            msgAlert: ''
        }

        this.handleInput = this.handleInput.bind(this)
        this.addProduct = this.addProduct.bind(this)
        this.validateField = this.validateField.bind(this)
        this.validateForm = this.validateForm.bind(this)
        this.hideAlertMsg = this.hideAlertMsg.bind(this) 
    }

    handleInput(e) {
        let name = e.target.name
        let value = e.target.value
        this.setState({ [name]: value }, this.validateField(name, value) )
    }

    addProduct(e) {
        e.preventDefault() 
        let {productName,barcode,price: productPrice} = this.state

        const params = {
            productName: productName,
            barcode: barcode,
            price: productPrice
        }

        if(this.state.formValid) {
           axios.post('/api/product', params)
           .then( response => { 
               if(response.data.length == 0) {
                this.props.history.push('/nomenclator')
               }else { 
                this.setState({
                    showAlert: true,
                    msgAlert: response.data
                })
               }             
            })
           .catch( error => console.log(error) )

          // this.props.history.push('/nomenclator')
        }
    }

    validateField(fieldName, value) { 
        let {productNameValid,barcodeValid,priceValid,formErrors} = this.state
 
        switch(fieldName) {
            case 'productName': 
                productNameValid = value.length > 1
                formErrors.productName = productNameValid ? "" : "Denumire prea scurta (minim 5 caractere)!" 
                break;
            case 'barcode':
                barcodeValid = value.length > 1
                formErrors.barcode = barcodeValid ? "" : "Barcode prea scurt!" 
                break;
            case 'price':
                priceValid = value.length > 0
                formErrors.price = priceValid ? "" : "Pret prea scurt!"
                break;
            default:
                break;
        }
       
        this.setState({ 
            productNameValid,
            barcodeValid,
            priceValid,
            formErrors
         }, this.validateForm)

    }

    validateForm() {
        this.setState({ formValid: this.state.productNameValid && this.state.barcodeValid && this.state.priceValid  })
    }

    errorClass(error) {
        return error.length === 0 ? "" : "has-error"
    }

    hideAlertMsg() {
        this.setState({ showAlert: false })  
    }

    render() {
        return(
            <div className="container"> 
                <div className="container-sales"> 

                {
                    this.state.showAlert  
                    ? <AlertMessage alertModel='alert-warning' 
                                    onClickHide={this.hideAlertMsg }
                                    message={this.state.msgAlert}                                    
                      />  
                    : null
                } 


                    <div className="justify"> 
                        <form onSubmit={this.addProduct}>
                            <p className="title-add-product">Adauga un nou produs</p> 

                            <div className="panel panel-default">
                                <FormErrors formErrors={this.state.formErrors} />
                            </div>


                            <FormInput colSm="input-container" 
                                   type="text"
                                   errorClass={this.errorClass(this.state.formErrors.productName)}
                                   name="productName"  
                                   value={this.state.productName} 
                                   onChange={this.handleInput} 
                                   placeholder="Denumire Produs"  
                                   icon={icon.faArchive}                              
                            /> 

                            <FormInput colSm="input-container" 
                                   type="text"
                                   errorClass={this.errorClass(this.state.formErrors.barcode)}
                                   name="barcode"  
                                   value={this.state.barcode} 
                                   onChange={this.handleInput} 
                                   placeholder="Barcode"  
                                   icon={icon.faBarcode}                              
                            /> 

                            <FormInput colSm="input-container" 
                                   type="text"
                                   errorClass={this.errorClass(this.state.formErrors.price)}
                                   name="price"  
                                   value={this.state.price} 
                                   onChange={this.handleInput} 
                                   placeholder="Pret"  
                                   icon={icon.faCreditCard}                              
                            />    

                            <div className="form-group">
                                <button type="submit" className="btn btn-info btn-block"  disabled={!this.state.formValid} >Adauga</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}