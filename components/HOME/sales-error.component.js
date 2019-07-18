import React, { Component } from 'react' 
import '../../../../public/css/calculator.css' 

export default class SalesError extends Component {

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
                        
                        <p className="salesErrorMessage"> 
                        
                            { this.props.errorMsg }

                            <br /> <br />

                            <button className="btn salesBtnReturnErr"
                             onClick={this.props.handleClick} 
                             data-value="back">
                                Inapoi
                            </button>
                        
                         </p>
                                       
                    </div>
                </div>
            </div>
        )
    }
}