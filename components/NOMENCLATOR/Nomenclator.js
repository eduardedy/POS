import React from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import axios from 'axios'

export default class Nomenclator extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            products: [],
            searchText: '',
            showRefreshSearchIcon: false
        }

        this.searchProduct = this.searchProduct.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.refreshSearch = this.refreshSearch.bind(this)
    }

    // get all the products by default
    componentDidMount() {
        axios.get('/api/product/')
            .then( response => this.setState({ products: response.data }) )
            .catch( error => console.log(error) )
    }

    // componentWillUnmount() {
    //     axios.get('/api/product')
    //         .then( response => this.setState({ products: response.data }) )
    //         .catch( error => console.log(error) )
    // }

    searchProduct() { 
        let id = this.state.searchText
        axios.get('/api/product/' + id)
        .then( response => this.setState({ products: response.data }) )
        .catch( error => console.log(error) )   
        // display the refresh button
        this.setState({showRefreshSearchIcon: true})      
    }

    refreshSearch() {  
        // display all products
        axios.get('/api/product')
        .then( response => this.setState({ products: response.data }) )
        .catch( error => console.log(error) )   
        // reset the state to hide the refresh btn and to clear the search-input
        this.setState({
            showRefreshSearchIcon: false,
            searchText:''
        })  
    }

    handleInput(e) {
        this.setState({ searchText: e.target.value })  
    }

    renderProducts() {
        return this.state.products.map((product,i) => {
          return (
          <tr key={product.id}> 
              <td> { product.name } </td>
              <td> { product.code } </td>
              <td> { product.price } </td>
              <td>
                <span                       
                    className="fa fa-times nmcl-remove-product"
                    data-id={product.id}
                    onClick={this.deleteProduct }
                >
                </span>


                <Link to={"/nomenclator/edit/"+product.id} >
                    <span  
                        data-id={product.id} 
                        className="fa fa-pencil nmcl-edit-product"
                    >                    
                    </span>
                </Link>


              </td>
          </tr> 
           )
        })
    }

    deleteProduct(e){ 
        if(confirm("Sunteti sigur(a) ca vreti sa stergeti produsul?")){
            axios.delete('/api/product/' + e.target.dataset.id)
            .then( response =>  console.log(response.data) )
            .catch( error => console.log(error) ) 
        } 
    }

    // this is the refresh icon and will be displayed only if the user searches for smth
    showRefreshSearchIcon(){
        return (
            <span className="fa fa-refresh" onClick={this.refreshSearch}></span>
        )
    }

    render() {
        return(
            <div className="container-sales container-nmcl">  
                {/* <h2><Link to="/create-new"> Nomenclator produse </Link></h2> */}

                <div className="row search-box">
                    <div className="col-md-10"> 
                        <input type="text"                                    
                                    className="form-control nmcl-search-product"
                                    placeholder="Cauta dupa denumire sau barcode"
                                    onChange={this.handleInput}
                                    value={this.state.searchText}
                        />
                        <span className="fa fa-search" onClick={this.searchProduct}></span>
                        {  this.state.showRefreshSearchIcon ? this.showRefreshSearchIcon() : null  }
                    </div>

                    <div className="col-md-2"> 
                         <Link to="/nomenclator/create" exact="true" className="btn btn-info btn-block"> 
                            Adauga 
                        </Link> 
                    </div> 
                </div>

                <table className="table table-nomenclator">
                    <thead>
                        <tr>
                            <th>Denumire</th>
                            <th>Barcode</th>
                            <th>Pret</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderProducts()}
                    </tbody>
                </table> 
            </div>
        )
    }
}