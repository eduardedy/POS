import React, {Component} from 'react'

export default class FormRadio extends Component {
    render() {
        return (  
                <label className="radio-inline checkcontainer">
                 {this.props.label}
                    <input  type="radio"
                            className= {`${this.props.errorClass}`}
                            name={this.props.name}
                            value={this.props.value}
                            checked={this.props.stateChecked === this.props.value}
                            onChange={this.props.onChange}
                             
                    />
                     
                    <span className="radiobtn"></span>
                </label>          
        )
    }
}