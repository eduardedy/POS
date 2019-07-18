import React, { Component } from 'react' 
import SalesCart from './HOME/sales-cart.component'
import SalesCalculator from './HOME/sales-calculator.component'
import SalesAutocomplete from './HOME/sales-autocomplete.component' 
import SalesError from './HOME/sales-error.component'
import AlertMessage from './ALERT/alert-message'
 
export default class Home extends Component {   

    constructor(props) {
        super(props) 
        this.state = {
            bill: [], // used to find out the final payment amount
            calculatorValue: [], // calculator input value
            pieces: 1,
            currentComponent: 'calculator', // I choose between 2 components: calculator OR autocomplete list - if there are duplicates for a certain product
            autocompleteList: [],
            errorMsg: '',
            restToCashed: '', // this will be used after the money taker inputs the value taken from the customer, by then I'll use bill[] state
            totallyCashed: 0, // how much the money taker took from the customer
            restLabel: "Rest de incasat" , // will be switched with "Rest de acordat"
            labelColor: 'orange',
            collectCashInput: '',  // this is the input where the cashed money is inputted
            showAlert: false,  // if the user tries to open ModalCollectMoney and there are no money display a warning msg
            showSuccessAlert: false, // show this alert after the current receipt is released
        }

        this.handleClick = this.handleClick.bind(this) 
        this.renderProductsList = this.renderProductsList.bind(this) 
        this.checkCodebare = this.checkCodebare.bind(this)
        this.totalBill = this.totalBill.bind(this)
        this.handlePieces = this.handlePieces.bind(this)
        this.handleCalculatorValue = this.handleCalculatorValue.bind(this)
        this.currentComponent = this.currentComponent.bind(this)
        this.addFromAutocompleteList = this.addFromAutocompleteList.bind(this)
        this.deleteProduct = this.deleteProduct.bind(this) 
        this.handleCollectCashInput = this.handleCollectCashInput.bind(this) 
        this.clearColectMoneyForm = this.clearColectMoneyForm.bind(this)
        this.showAlertMsg = this.showAlertMsg.bind(this)
        this.hideAlertMsg = this.hideAlertMsg.bind(this) 
        this.hideAlertSuccessMsg = this.hideAlertSuccessMsg.bind(this)
        this.clearShoppingCart = this.clearShoppingCart.bind(this)
    }

    componentDidMount() {
        let localStorageBill = JSON.parse(localStorage.getItem('billProducts')) !== null 
        ? JSON.parse(localStorage.getItem('billProducts')) 
        : []
         
        this.setState({ 
            bill: localStorageBill
        })          
    }
     
    // this function is about Calculator Component
    handleClick(e){
        const value = e.target.getAttribute('data-value')
        switch(value){
            case 'clear':
                this.setState({ calculatorValue: [] })
                break
            case '+': 
           // this.testulet()
              this.checkCodebare()                
                break
            case 'back':  
                this.setState({ 
                     calculatorValue: [],  
                     pieces: 1,
                     currentComponent: 'calculator', 
                     autocompleteList: [],
                     errorMsg: ''
                    })            
                break                
            default:
                const calculatorValue = [...this.state.calculatorValue, value]
                this.setState({ calculatorValue })
        }
    }
    
    // render the products added in the cart
    renderProductsList() {        
        return this.state.bill.map((product, i) => {
          let total = product[0].price * product[0].pieces
          return  ( 
            <tr key={i}> 
                <td>
                    <span className="cart-product-name"> { product[0].name } </span>
                    <br />
                    <span className="cart-product-code"> Cod: { product[0].code } </span>
                </td>
                <td>{ product[0].price }</td>
                <td>{ product[0].pieces }</td>
                <td className="cart-product-total">{ total.toFixed(2) }</td>
                <td>
                    <span onClick={this.deleteProduct} 
                          data-id={i} 
                          className="fa fa-times remove-from-bill">
                    </span>
                </td>
            </tr>
          )
        })
    }

    // No. of pieces for each product added
    handlePieces(e) {
        this.setState({pieces: e.target.value})
    }

    // check if the added product exist in the system
    checkCodebare() {
        // search only if the user typed a value 
        if(this.state.calculatorValue.length > 0){
            axios.get('/api/product/' + this.state.calculatorValue.join(""))
                .then(response => { 
                    // if there was found only one result (which is what we look for)               
                    if(response.data.length === 1) {
                        // after the product is checked...store it in a variable
                        let newProduct = response.data 
                        // assign the No. of pieces for the new product
                        newProduct[0].pieces = +this.state.pieces
                        
                        // retrieve data from localStorage 
                        let localStorageBill = JSON.parse(localStorage.getItem('billProducts')) !== null 
                                             ? JSON.parse(localStorage.getItem('billProducts')) 
                                             : []
                        // add to the current data the new product
                        localStorageBill = [...localStorageBill, newProduct]
                        // store the new data in localStorage 
                        localStorage.setItem('billProducts', JSON.stringify(localStorageBill)) 

                        // reset the state
                        let bill = localStorageBill    // [...this.state.bill, newProduct]
                        this.setState({ 
                            bill: bill,
                            calculatorValue: [],
                            pieces: 1,
                            showAlert: false              
                        })  
                        
                    } 
                    // if there are several results for the current query,
                    // then display a list with them from where the user will choose only one product
                    else if(response.data.length > 1) { 
                        this.setState({
                            autocompleteList:  response.data,
                            currentComponent: 'autocomplete' // change the calculator with the autocompleteList
                        }) 
                    } 
                    // if no results were found display a warning message
                    else {
                        console.log(`Nu sa gasit niciun rezultat`)
                        
                        this.setState({ 
                            currentComponent: 'error', // change the calculator with the autocompleteList
                            errorMsg: `Nu sa gasit niciun produs cu denumirea / codul ${this.state.calculatorValue.join("")}`
                        }) 
                    }
                })
                .catch(error => console.log(error))
        } 
    }

    // reusable function to calculate the value of the receipt
    calculateTotalBill(bill) {  
        let sum                     
        sum = bill.reduce((total, elem)=>{
            return total + (+elem[0].price * elem[0].pieces)
        },0) 
        sum = sum         
        return sum 
    }

    // calculate and display (in the Main Table Footer) the total amount of payment
    totalBill() { 
        let bill = this.state.bill
        if(bill.length > 0){               
            let sum = this.calculateTotalBill(bill)
            let footer =  
            <tr>
                <th className="footer-col-1">Total:</th>
                <th></th>
                <th></th>
                <th className="footer-col-4">{ sum.toFixed(2)  }</th>
                <th></th>
            </tr> 
            return footer
        }  
    }

    // here we handle (& store) what the user types
    handleCalculatorValue(e) {
        this.setState({
            calculatorValue: [e.target.value]  
        })
    }

    // here we manage the components: calculator, autocomplete-list & error-message
    // according the current situation, we will render a certain component. Calculator is the default one
    currentComponent() {
        if(this.state.currentComponent == 'calculator') {
            return <SalesCalculator 
                        calculatorValue={this.state.calculatorValue} 
                        handleClick={this.handleClick} 
                        pieces={this.state.pieces} 
                        handlePieces={this.handlePieces}
                        handleCalculatorValue={this.handleCalculatorValue}
                        totalBill={ this.calculateTotalBill(this.state.bill) }
                        restToCashed={this.state.restToCashed} 
                        totallyCashed={this.state.totallyCashed}
                        restLabel={this.state.restLabel}
                        labelColor={ this.state.labelColor }
                        handleCollectCashInput = { this.handleCollectCashInput }
                        collectCashInput = { this.state.collectCashInput } 
                        releaseBill={this.releaseBill} 
                        showAlertMsg={this.showAlertMsg} 
                        clearColectMoneyForm={this.clearColectMoneyForm}
                        clearShoppingCart={this.clearShoppingCart}
                    />
        }else if(this.state.currentComponent == 'autocomplete'){
            return <SalesAutocomplete
                        calculatorValue={this.state.calculatorValue} 
                        autocompleteList={this.autocompleteList()} 
                        handleClick={this.handleClick}
                        pieces={this.state.pieces} 
                        handlePieces={this.handlePieces}
                        handleCalculatorValue={this.handleCalculatorValue}
                    />
        }else if(this.state.currentComponent == 'error'){
            return <SalesError
                        calculatorValue={this.state.calculatorValue} 
                        errorMsg={this.state.errorMsg} 
                        handleClick={this.handleClick}
                        pieces={this.state.pieces} 
                        handlePieces={this.handlePieces}
                        handleCalculatorValue={this.handleCalculatorValue}
                    />
        }
    }

    // if there are multiple products with a similar name I'll display all of them
    autocompleteList() { 
        return this.state.autocompleteList.map((product, i) => { 
            return  ( 
                <tr key={i}                
                    data-id={product.id} 
                    data-name={product.name} 
                    data-price={product.price} 
                    data-code={product.code} 
                    onClick={this.addFromAutocompleteList}
                    className="pointer" > 
                        <td>{ product.name }</td>
                        <td>{ product.price }</td>  
                </tr>
            )
        })  
    }

    // use this func to choose one product from the list of products with similar name (see the above func)
    addFromAutocompleteList(e) {    
        // after the product is checked...store it in a variable
        let newProduct = [{
            id: e.target.parentElement.dataset.id,
            name: e.target.parentElement.dataset.name,
            price: e.target.parentElement.dataset.price,
            code: e.target.parentElement.dataset.code,
            pieces: +this.state.pieces
        }]
          
        // retrieve data from localStorage 
        let localStorageBill = JSON.parse(localStorage.getItem('billProducts')) !== null 
        ? JSON.parse(localStorage.getItem('billProducts')) 
        : []
        // add to the current data the new product
        localStorageBill = [...localStorageBill, newProduct]
        // store the new data in localStorage 
        localStorage.setItem('billProducts', JSON.stringify(localStorageBill)) 

        // reset the state after the product is sent to the cart
        let bill = localStorageBill    // [...this.state.bill, newProduct]
        this.setState({ 
            bill: bill,
            calculatorValue: [],
            pieces: 1,
            currentComponent: 'calculator', 
            autocompleteList: [],
            showAlert: false            
        })   
    }

    deleteProduct(e){
        let bill = this.state.bill // get all products from the bill
        let key = e.target.dataset.id // get the ID of the product that I'll delete
        // I used splice instead delete because delete leaves behind garbage in the form of empty values
        // The value disappears but the memory is not reallocated
        bill.splice(key, 1)
        // store the new data in the react state
        this.setState({ bill })
        // store the new data in localStorage 
        localStorage.setItem('billProducts', JSON.stringify(bill)) 
    }

    // handle what the user inputs in the final form, before to release the receipt (show the total, the cash and the rest )
    handleCollectCashInput(e) {
        this.setState({collectCashInput: e.target.value}, this.handleTotallyCashed(e.target.value) )
    }

    // when the money taker inputs the value I'll recalculate the change 
    handleTotallyCashed(inputValue) {
        // if the user clears the input set the default value to 0
        inputValue = inputValue != '' ? inputValue : 0 
        this.setState({
            totallyCashed: inputValue, // how much money got from the customer
            restToCashed: this.RestToCashed(inputValue) // how much have to give back to the customer
        })
     }

    // calculate how much money have to give back to the customer
    RestToCashed(inputValue) {
        // get the products 
        let bill = this.state.bill
        let sumInitial, change
        
        // calculate the total payment (I already have a func to calculate: calculateTotalBill())
        if(bill.length > 0) {               
            sumInitial = this.calculateTotalBill(bill) 
        }else{
            sumInitial = 0 // by default 0, if there are no products in the cart
        }
  
        // when the money taker starts cashing the money  the rest will be recalculated
        if(inputValue != undefined && inputValue.length > 0 ){
            change = (+sumInitial - +inputValue) 
        } 
        // the default rest (actually this is the initial receipt value before cashing the money)
        else { 
            change = sumInitial 
        } 
        
        // After I cashed the money I'll check if I have some change to give to the customer
        if(change <= 0){
            this.setState({ restLabel: "Rest de acordat", labelColor: '#1ab394' }) 
            return -change 
        }else{
            this.setState({ restLabel: "Rest de incasat", labelColor: 'orange' })
            return change 
        }
    }
 
    // clear form after release the receipt
    clearColectMoneyForm() {
        this.setState({
            collectCashInput: '',
            totallyCashed: 0,
            restToCashed: '',
            restLabel: 'Rest de incasat',
            labelColor: 'orange'
        })
    }

    // remove all products from the cart (reset setState & localStorage)
    clearShoppingCart() {
         
        this.setState({
            bill: [], // remove products from react state
            showSuccessAlert: true // show the success message
        })

        // remove products from localStorage
        localStorage.setItem('billProducts', JSON.stringify([]))

        // after 5 sec close the success message 
        setTimeout(
            function() {
                this.setState({showSuccessAlert: false})
            }
            .bind(this),
            5000
        )
    }
 
    hideAlertMsg() {
        this.setState({ showAlert: false })  
    }

    hideAlertSuccessMsg() {
        this.setState({ showSuccessAlert: false })  
    }

    showAlertMsg(){
        this.setState({ showAlert: true }) 
    }
 
    render() {    
        return (
            <div className="container-sales">  
                {/* Warning alert */}
                {
                    this.state.showAlert && this.state.bill.length == 0  
                    ? <AlertMessage alertModel='alert-danger' 
                                    onClickHide={this.hideAlertMsg }
                                    message="Nu ati adaugat niciun produs!"                                    
                      />  
                    : null
                }  

                {/* Success message */}
                {
                    this.state.showSuccessAlert 
                    ? <AlertMessage alertModel='alert-primary' 
                                    onClickHide={this.hideAlertSuccessMsg}
                                    message="Bonul fost eliberat cu succes!"                                    
                      /> 
                    : null
                }

                <div className="row justify-content-center">   
                    {/* Cart component */}
                    <SalesCart renderProductsList={this.renderProductsList}  totalBill={this.totalBill} />  
                    {/* Calculator component  */}
                    {  this.currentComponent() }
                </div>
            </div>
        )
    }
}
