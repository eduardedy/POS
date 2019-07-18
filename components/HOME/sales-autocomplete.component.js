import React, { Component } from 'react' 
import '../../../../public/css/calculator.css'
import Button from './Button'


export default class SalesAutocomplete extends Component {

    render() {
        return (
            <div className="col-md-3 sales-section">
                <div import ="card"> 
                    <div className="card-body">


                        <div className="row">
                            <div className="col-md-3"> 
                                <input 
                                    onChange={this.props.handlePieces} 
                                    value={this.props.pieces} 
                                    className="form-control"
                                /> 
                            </div>
                            x
                            <div className="col-md-8 autocomplete-search">
                                <input type="search"
                                    onChange={this.props.handleCalculatorValue} 
                                    value={this.props.calculatorValue.join("")} 
                                    className="form-control form-control-reset"
                                />
                                <span className="glyphicon glyphicon-refresh" 
                                    onClick={this.props.handleClick} 
                                    data-value="back">
                                </span> 
                            </div>
                        </div>

                        <br />
                        <table className="table table-striped"> 
                            <tbody>
                                { this.props.autocompleteList }
                            </tbody>
                        </table>
                                       
                    </div>
                </div>
            </div>
        )
    }
}