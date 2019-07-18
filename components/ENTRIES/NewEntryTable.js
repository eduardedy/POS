import React, {Component} from 'react'

export default class NewEntryTable extends Component {
    render() {
        return ( 
            <div>      
                <table className="table table-striped table-dark">
                    <thead className=" ">
                        <tr>
                            <th>Nr. crt.</th>
                            <th>Gestiune</th>
                            <th>Denumire produs/serviciu</th>
                            <th>U.M.</th>
                            <th>Cant.</th>
                            <th>Pret</th>
                            <th>Valoare</th>
                            <th>TVA</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody> 
                       
                            {                               
                                  
                                    this.props.storeReception.map((product,i)=>{
                                      return (
                                        <tr key={i}>
                                           <td>{ i + 1 }.</td>
                                           <td>{ product.warehouse }</td>
                                           <td>{ product.service_name }</td>
                                           <td>{ product.unit }</td>
                                           <td>{ product.qnt_doc }</td>
                                           <td>{ product.purchase_price }</td>
                                           <td>{ product.name }</td>
                                           <td>{ product.vat_rate }</td>
                                           <td>  </td>
                                        </tr> 
                                      )
                                    })                                 

                            }
                       
 
                    </tbody>
                </table>  

                <button onClick={this.props.saveReception} className="btn btn-primary btn-block">Salveaza receptia</button>                        
            </div> 
           
        )
    }
}