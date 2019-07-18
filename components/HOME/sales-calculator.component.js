import React, { Component } from 'react' 
import Buttons from './Buttons'
import Button from './Button'
import '../../../../public/css/calculator.css'
import ModalCollectMoney from '../MODAL/modal-colect-money' 

export default class SalesCalculator extends Component {
 
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
                            <div className="col-md-8">
                                <input 
                                    onChange={this.props.handleCalculatorValue} 
                                    value={this.props.calculatorValue.join("")} 
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <br />

                         {   this.props.AxiosComponent   }   

                        <Buttons>
                            <Button onClick={this.props.handleClick} label="7" value="7" />
                            <Button onClick={this.props.handleClick} label="4" value="4" />
                            <Button onClick={this.props.handleClick} label="1" value="1" />
                            <Button onClick={this.props.handleClick} label="C" value="clear" />

                            <Button onClick={this.props.handleClick} label="8" value="8" />
                            <Button onClick={this.props.handleClick} label="5" value="5" />
                            <Button onClick={this.props.handleClick} label="2" value="2" />
                            <Button onClick={this.props.handleClick} label="0" value="0" />

                            <Button onClick={this.props.handleClick} label="9" value="9" />
                            <Button onClick={this.props.handleClick} label="6" value="6" />
                            <Button onClick={this.props.handleClick} label="3" value="3" />
                            <Button onClick={this.props.handleClick} label="." value="." />

                            <Button onClick={this.props.handleClick} label="+" value="+" size="2" />

                        </Buttons> 
  
                        <br/>
 
                        <div className="row"> 
                            <div className="col-md-12">       
                                <ModalCollectMoney 
                                 totalBill={this.props.totalBill}
                                 restToCashed={ this.props.restToCashed }
                                 totallyCashed={ this.props.totallyCashed }
                                 restLabel={ this.props.restLabel }
                                 labelColor={ this.props.labelColor }
                                 handleCollectCashInput = { this.props.handleCollectCashInput }
                                 collectCashInput = { this.props.collectCashInput }
                                 clearColectMoneyForm={this.props.clearColectMoneyForm}
                                 releaseBill={this.props.releaseBill}
                                 showAlertMsg={this.props.showAlertMsg}  
                                 clearShoppingCart={this.props.clearShoppingCart}                                
                                />                                 
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}