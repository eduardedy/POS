import React, {Component} from 'react'
import FormInput from '../FORM/FormInput'
import FormSelect from '../FORM/FormSelect'
import FormRadio from '../FORM/FormRadio'
import axios from 'axios'
import FormErrors from '../FORM/FormErrors' 

export default class NewEntryForm extends Component {

    constructor(props) {
        super(props)

        this.state = { 
            moment:'',

            // form fields
            name: '',
            doc: '',
            nr_doc: '',
            date_doc: '',
            currency: '',
            series: '',
            date_entrance: '',
            warehouse: '',
            service_name: '',
            vat_rate: '',
            code: '',
            unit: '',
            qnt_doc: '',
            qnt_received: '',
            purchase_price: '',
            vat_requested: '',
            // lists (suppliers, product, warehouses etc.)
            productOptions: [],
            supplierOptions: [],
            warehouseOptions: [],
            vatRateOptions: [],
            docTypeOptions: [],
            // form validation
            formErrors: {
                name: '',
                doc: '',
                nr_doc: '',
                date_doc: '',
                currency: '',
                series: '',
                date_entrance: '',
                warehouse: '',
                service_name: '',
                vat_rate: '',
                code: '',
                unit: '',
                qnt_doc: '',
                qnt_received: '',
                purchase_price: '',
                vat_requested: ''
            },
            nameValid: false,
            docValid: false,
            nr_docValid: false,
            date_docValid: false,
            currencyValid: false,
            seriesValid: false,
            date_entranceValid: false,
            warehouseValid: false,
            service_nameValid: false,
            vat_rateValid: false,
            codeValid: true,
            unitValid: true,
            qnt_docValid: false,
            qnt_receivedValid: false,
            purchase_priceValid: false,
            vat_requestedValid: false,

            formValid: false
        }

        this.baseState = this.state

        this.handleInput = this.handleInput.bind(this)
        this.handleSelect = this.handleSelect.bind(this)   
        this.handleChange  = this.handleChange .bind(this)   

        this.onSubmit = this.onSubmit.bind(this)
        this.validateField = this.validateField.bind(this)
        this.validateForm = this.validateForm.bind(this)
        this.resetForm = this.resetForm.bind(this)        
    }

    handleInput(e) {
        const name = e.target.name
        const value = e.target.value
        this.setState({[name]: value }, this.validateField(name, value) )
    }

    handleSelect (value, options) {          
        this.setState({ [options.name]: value }, this.validateField(options.name, value.value) ) 

        // when set the product (service name), set also, automatically, based on DB info, the code and unit of measurement
        if(options.name == 'service_name') {
            this.setState({ 
                code: value.code,
                unit: value.unit_measurement
            } )               
        } 
    }  

    handleChange(moment) {
        this.setState({
             moment
        });

        console.log('Data setate este: ' + moment)
    }
 
    // add a new product on the current reception
    onSubmit(e) {
        e.preventDefault() 
        // destructuring state to get only the form values
        const {nr_doc, date_doc, date_entrance,
                code, unit, qnt_doc, qnt_received, 
                purchase_price, vat_requested} = this.state 

        const name = this.state.name.value
        const nameId = this.state.name.id
        const doc = this.state.doc.document_id
        const series = this.state.series.value          
        const warehouse = this.state.warehouse.value
        const warehouseId = this.state.warehouse.warehouse_id
        const service_name = this.state.service_name.value
        const service_name_id = this.state.service_name.id
        const vat_rate = this.state.vat_rate.value 
        const vat_rate_id = this.state.vat_rate.id 
        const currency = this.state.currency.value 
      
        // store all form values in this object
        const params = {
            name, nameId, doc, nr_doc, date_doc, currency, series, date_entrance,
            warehouse, warehouseId, service_name, service_name_id, vat_rate, vat_rate_id,
            code, unit, qnt_doc, qnt_received, purchase_price, vat_requested
        }  
  
        // send object to parent component to update the state (to store the new product of the reception)
        this.props.handleStoreReception(params)  
        
        // clear second row of the form to add a new product on the current reception
        this.setState({
            service_name: '',
            vat_rate: '',
            code: '',
            unit: '',
            qnt_doc: '',
            qnt_received: '',
            purchase_price: '',
            vat_requested: '',

            service_nameValid: false,
            vat_rateValid: false,
            codeValid: true,
            unitValid: true,
            qnt_docValid: false,
            qnt_receivedValid: false,
            purchase_priceValid: false,
            vat_requestedValid: false,

            formValid: false
        })
    }

    componentDidMount() {
        // get warehouses
        axios.get('/api/warehouse')
        .then(resp => {
            this.setState({warehouseOptions: resp.data})   
        })
        .catch(error => console.log(error))   
 
        
        // get documents type
        axios.get('/api/document_type')
        .then(resp => {
            this.setState({docTypeOptions: resp.data})  
        })
        .catch(error => console.log(error))   


        // get vat rate
        axios.get('/api/vat_rate')
        .then(resp => {
            this.setState({vatRateOptions: resp.data})   
        })
        .catch(error => console.log(error))   
 

        // get suppliers
        axios.get('/api/supplier')
        .then(resp => {
            this.setState({supplierOptions: resp.data})  
        })
        .catch(error => console.log(error))        


        // get product/services
        axios.get('/api/product')
        .then(resp => {
            this.setState({productOptions: resp.data})    
        })
        .catch(error => console.log(error))         
    }

    validateField(name, value) {
        let {formErrors, nameValid, docValid, nr_docValid, date_docValid, currencyValid, seriesValid,
             date_entranceValid, warehouseValid, service_nameValid, vat_rateValid, codeValid, unitValid, 
             qnt_docValid, qnt_receivedValid, purchase_priceValid, vat_requestedValid} = this.state

        switch(name) {
            case 'name':
                nameValid = value.length > 1 
                formErrors.name = nameValid ?  value.length : 'Nume furnizor invalid!'  
                break;
            case 'doc':
                docValid = value.length > 1 
                formErrors.doc = docValid ?  '' : 'Selectati documentul de achizitie!'
                break;
            case 'nr_doc':
                nr_docValid = value.length > 2 
                formErrors.nr_doc = nr_docValid ?  '' : 'Introduceti numarul documentului!'
                break;
            case 'date_doc':
                date_docValid = value.length > 1 
                formErrors.date_doc = date_docValid ?  '' : 'Setati data documentului!'
                break;
            case 'currency':
                currencyValid = value.length > 1 
                formErrors.currency = currencyValid ?  '' : 'Setati data documentului!'
                break;
            case 'series':
                seriesValid = value.length > 1 
                formErrors.series = seriesValid ?  '' : 'Setati seria de receptie!'
                break;
            case 'date_entrance':
                date_entranceValid = value.length > 1 
                formErrors.date_entrance = date_entranceValid ?  '' : 'Setati seria de receptie!'
                break;
            case 'warehouse':
                warehouseValid = value.length > 1 
                formErrors.warehouse = warehouseValid ?  '' : 'Nu ati ales gestiunea!'
                break;
            case 'service_name':
                service_nameValid = value.length > 1 
                formErrors.service_name = service_nameValid ?  '' : 'Alegeti Produsul (Serviciul)!'
                break;
            case 'vat_rate':
                vat_rateValid = value.length > 1 
                formErrors.vat_rate = vat_rateValid ?  '' : 'Setati TVA-ul!'
                break;
            case 'code':
                codeValid = value.length > 2 
                formErrors.code = codeValid ?  '' : 'Setati codul!'
                break;
            case 'unit':
                unitValid = value.length >= 1 
                formErrors.unit = unitValid ?  '' : 'Setati unitatea de masura!'
                break;
            case 'qnt_doc':
                qnt_docValid = value.length >= 1 
                formErrors.qnt_doc = qnt_docValid ?  '' : 'Introduceti numarul documentului!'
                break;
            case 'qnt_received':
                qnt_receivedValid = value.length >= 1 
                formErrors.qnt_received = qnt_receivedValid ?  '' : 'Introduceti cantitatea primitra!'
                break;
            case 'purchase_price':
                purchase_priceValid = value.length >= 1 
                formErrors.purchase_price = purchase_priceValid ?  '' : 'Introduceti pretul de achizitie!'
                break;
            case 'vat_requested':
                vat_requestedValid = value.length > 1 
                formErrors.vat_requested = vat_requestedValid ?  '' : 'Setati daca (nu) are TVA!'
                break;
            default:
                break;
        }

        this.setState({
            formErrors,
            nameValid,
            docValid,
            nr_docValid,
            date_docValid,
            currencyValid,
            seriesValid,
            date_entranceValid,
            warehouseValid,
            service_nameValid,
            vat_rateValid,
            codeValid,
            unitValid,
            qnt_docValid,
            qnt_receivedValid,
            purchase_priceValid,
            vat_requestedValid
        }, this.validateForm) 
    }

    validateForm() {
        this.setState({
            formValid:  
            this.state.nameValid &&
            this.state.docValid &&
            this.state.nr_docValid &&
            this.state.date_docValid &&
            this.state.currencyValid &&
            this.state.seriesValid &&
            this.state.date_entranceValid &&
            this.state.warehouseValid &&
            this.state.service_nameValid &&
            this.state.vat_rateValid &&
            this.state.codeValid &&
            this.state.unitValid &&
            this.state.qnt_docValid &&
            this.state.qnt_receivedValid &&
            this.state.purchase_priceValid &&
            this.state.vat_requestedValid
        })
    }

    errorClass(error) {
       return error.length === 0 ? '' : 'has-error'
    }

    resetForm(){
        this.setState(this.baseState)
    }
    

    render() {  

        
        const {
            name, doc, nr_doc, date_doc, currency, series, date_entrance,
            warehouse, service_name, vat_rate, code, unit, qnt_doc, qnt_received, 
            purchase_price, vat_requested
        } = this.state
      
        const currencyOptions = [
            { value: 'RON', label: 'RON'},
            { value: 'EUR', label: 'EUR'},
            { value: 'USD', label: 'USD'}
        ]

        const receptionSeriesOptions = [
            { value: 'LPOS (nr. 001)', label: 'LPOS (nr. 001)'} 
        ] 

        return ( 
            <div>   
 
                
                <form onSubmit={this.onSubmit}>

                    <FormErrors formErrors={this.state.formErrors} /> 
                    
                    <div className="form-group row">


                   


                         
                        <FormSelect className="col-sm-2"  
                                    for="name"
                                    name="name"
                                    label="Nume sau CIF furnizor" 
                                    value={name}
                                    handleChange={this.handleSelect}
                                    options={this.state.supplierOptions} />

                        <FormSelect className="col-sm-1" 
                                    for="doc" 
                                    name="doc"
                                    label="Doc. achizitie" 
                                    value={doc}
                                    handleChange={this.handleSelect} 
                                    options={this.state.docTypeOptions} />                      

                        <FormInput type="text"
                                   colSm="col-sm-1" 
                                   for="nr_doc"
                                   id="nr_doc"
                                   name="nr_doc" 
                                   label="Nr. doc." 
                                   value={nr_doc} 
                                   onChange={this.handleInput} 
                                   errorClass={this.errorClass(this.state.formErrors.nr_doc)} />

                        <FormInput type="date"
                                   colSm="col-sm-2" 
                                   for="date_doc" 
                                   id="date_doc" 
                                   name="date_doc" 
                                   label="Data doc." 
                                   value={date_doc} 
                                   onChange={this.handleInput} 
                                   errorClass={this.errorClass(this.state.formErrors.date_doc)} />

                        <FormSelect className="col-sm-1" 
                                    for="currency"  
                                    name="currency"
                                    label="Moneda" 
                                    value={currency}
                                    handleChange={this.handleSelect}
                                    options={currencyOptions} />

                        <FormSelect className="col-sm-2"  
                                    for="series"   
                                    name="series"
                                    label="Serie receptie" 
                                    value={series}
                                    handleChange={this.handleSelect} 
                                    options={receptionSeriesOptions} />                       

                        <FormInput type="date" 
                                   colSm="col-sm-2" 
                                   for="date_entrance" 
                                   id="date_entrance" 
                                   name="date_entrance" 
                                   label="Data intrarii in stoc" 
                                   value={date_entrance} 
                                   onChange={this.handleInput}
                                   errorClass={this.errorClass(this.state.formErrors.date_entrance)} />  
                        
                    </div>
 
                    <br />

                    <div className="form-group row">

                        <FormSelect className="col-sm-1" 
                                        for="warehouse" 
                                        name="warehouse"
                                        label="Gestiune" 
                                        value={warehouse}
                                        handleChange={this.handleSelect} 
                                        options={this.state.warehouseOptions} /> 

                        <FormSelect className="col-sm-2"  
                                        for="service_name"
                                        name="service_name"
                                        label="Denumire serviciu" 
                                        value={service_name}
                                        handleChange={this.handleSelect} 
                                        options={this.state.productOptions} /> 

                        <FormInput type="text"
                                    colSm="col-sm-1" 
                                    for="code" 
                                    id="code" 
                                    name="code" 
                                    label="Cod" 
                                    value={code} 
                                    onChange={this.handleInput} 
                                    errorClass={this.errorClass(this.state.formErrors.code)} />

                        <FormInput type="text"
                                    colSm="col-sm-1" 
                                    for="unit" 
                                    id="unit" 
                                    name="unit" 
                                    label="U.M." 
                                    value={unit} 
                                    onChange={this.handleInput} 
                                    errorClass={this.errorClass(this.state.formErrors.unit)} />

                        <FormInput type="text"
                                    colSm="col-sm-1" 
                                    for="qnt_doc" 
                                    id="qnt_doc" 
                                    name="qnt_doc" 
                                    label="Cant doc." 
                                    value={qnt_doc} 
                                    onChange={this.handleInput} 
                                    errorClass={this.errorClass(this.state.formErrors.qnt_doc)} />

                        <FormInput type="text"
                                    colSm="col-sm-1" 
                                    for="qnt_received" 
                                    id="qnt_received" 
                                    name="qnt_received" 
                                    label="Cant primita" 
                                    value={qnt_received} 
                                    onChange={this.handleInput} 
                                    errorClass={this.errorClass(this.state.formErrors.qnt_received)} />

                        <FormInput type="text"
                                    colSm="col-sm-2" 
                                    for="purchase_price" 
                                    id="purchase_price" 
                                    name="purchase_price" 
                                    label="Pret achizitie (RON)" 
                                    value={purchase_price} 
                                    onChange={this.handleInput} 
                                    errorClass={this.errorClass(this.state.formErrors.purchase_price)} />
    
                        <FormSelect className="col-sm-1" 
                                        for="vat_rate"  
                                        name="vat_rate"
                                        label="Cota TVA" 
                                        value={vat_rate}
                                        handleChange={this.handleSelect}
                                        options={this.state.vatRateOptions} /> 
 
                        <div className="form-group col-sm-2">
                            <label>TVA</label>
                            <br/>  
                            <FormRadio colSm="col-sm-2" 
                                       value="da" 
                                       name="vat_requested"
                                       stateChecked={vat_requested} 
                                       onChange={this.handleInput} 
                                       label="Da"  />

                            <FormRadio colSm="col-sm-2" 
                                       value="nu" 
                                       name="vat_requested"
                                       stateChecked={vat_requested} 
                                       onChange={this.handleInput} 
                                       label="Nu"  />

{/* disabled={!this.state.formValid} */}
                            <button className="btn btn-info btn-md" disabled={!this.state.formValid} >Adauga</button>
                        </div>  
                                          
                    </div> 

                </form>
 
            </div> 
           
        )
    }
}