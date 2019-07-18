import React, { Component } from 'react'

export default class SalesCart extends Component {
  
    render() {
        return (
            <div className="col-md-8 sales-section">
                <div import ="card"> 
                    <div className="card-body">                      
                        <table className="table table-bill">
                            <thead>
                                <tr>
                                    <th>Denumire</th>
                                    <th>Pret Produs</th>
                                    <th>Cant.</th>
                                    <th>Valoare </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>{ this.props.renderProductsList() }</tbody>                            
                            <tfoot>{this.props.totalBill()}</tfoot>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}