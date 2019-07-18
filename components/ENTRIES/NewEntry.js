import React, {Component} from 'react'
import NewEntryForm from './NewEntryForm'
import NewEntryTable from './NewEntryTable'
import { NewEntryTableReplacement } from './NewEntryTableReplacement'

export default class NewEntry extends Component {

    constructor(props) {
        super(props)
        // here I store the reception (all products) before to input it in the system
        this.state = {
             storeReception: []
        }

        this.handleStoreReception = this.handleStoreReception.bind(this)
        this.saveReception = this.saveReception.bind(this) 
        this.clearFormReception = React.createRef()
    } 

    handleStoreReception(params) {      
        this.setState({ storeReception: [...this.state.storeReception, params] }) 
    }

    saveReception() {     
        let newProduct = []
        newProduct = {...this.state.storeReception}
        newProduct.count = this.state.storeReception.length

        axios.post(`/api/reception_document`, newProduct)
        .then(resp => { 
            if(resp.data.length == 0){
                // clear the state of EntriesForm (to get it ready for the next reception)
                this.clearFormReception.current.resetForm()
                // clear the current component state (storeReception),
                // which is used to display the products of the current reception & for DB insert also
                this.setState({ storeReception: [] })
            } else {
                console.log(resp.data)
            }
        })
        .catch(error => console.log(error))    
    }

    render() { 
        return ( 
            <div className="container-add-entry">    
                <h2 className="entries-h2">Receptii furnizori</h2>
                {/* Formular receptie */}
                <NewEntryForm 
                        handleStoreReception={this.handleStoreReception}
                        ref={this.clearFormReception}   
                />

                <hr className="style-one" />  <br />             
         
                {/* Tabel produse pt receptia curenta (daca n-am nimic afisez un mesaj) */}
                {
                    this.state.storeReception.length > 0 ?
                    <NewEntryTable storeReception={this.state.storeReception}
                                  saveReception={this.saveReception}
                    />
                    : <NewEntryTableReplacement />
                }
             </div> 
           
        )
    }
}