import React from 'react'
import axios from 'axios'

import EntriesFilter from './EntriesFilter'

export default class Entries extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            entries: []
        }
    }

    componentDidMount() {
        axios.get('/api/reception_document')
        .then(resp => this.setState({ entries: resp.data }) )
        .catch(error => console.log(error))
    }    

    render() {

        const testare = {
            backgroundColor: '#1ab394',
            border: '1px solid #1ab394',
            color: '#FFFFFF',
            padding: '0.25rem 0.5rem',
            fontSize: '0.7875rem',
            lineHeight: '1.5',
            borderRadius: '0.2rem',
            bottom: '3px',
            position: 'relative'
        }

        return (
            <div className="container-entries"> 
 


<br /> <br />
             

                    <EntriesFilter />

 
               <table className="table table-striped table-light">
                    <thead className="table-dark">
                        <tr>
                            <th>Nr. crt.</th>
                            <th>Furnizor</th>
                            <th>Doc. insotitor</th>
                            <th>Data receptie</th>
                            <th>Gestiune</th>
                            <th>Valoare fara TVA (RON)</th>
                            <th>Valoare TVA (RON)</th>
                            <th>Valoare totala (RON)</th> 
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody> 
                       
                        {                                                             
                            this.state.entries.map((entry,i)=>{
                                return (
                                <tr key={i}>
                                    <td>LPOS00{ i + 1 }.</td>
                                    <td>{ entry.supplier }</td>
                                    <td>{ entry.document_name } { entry.no_doc }</td>
                                    <td>{ entry.purchasing_date }</td>
                                    <td>{ entry.warehouse_name }</td>
                                    <td>{ entry.purchasing_price }</td>
                                    <td>{ (entry.purchasing_price * 0.19).toFixed(2) } </td>
                                    <td>{ (+entry.purchasing_price + (+entry.purchasing_price * 0.19)).toFixed(2)}</td>
                                    <td> 
                                        
                                        <i className="fa fa-pencil text-primary font-14 pointer"></i>

                                        <i className="fa fa-trash text-danger p-w-xs font-16 pointer"></i>
                                        
                                    </td>
                                </tr> 
                                )
                            })                                
                        }                      
 
                     </tbody>
                </table>  
            </div>
        )
    }
}