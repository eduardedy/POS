import React from 'react';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

export default class FormSelect extends React.Component {

    constructor(props) {
        super(props)
        this.state = { 
            isClearable: true,
        }
     }
 
    render() {
        const { isClearable } = this.state

        return ( 
            <div className={`form-group ${this.props.className} ${this.props.errorClass}`}>
            { this.props.for ? <label htmlFor={this.props.for}>{this.props.label}</label> : null }
        
                <Select  
                        value={this.props.value}
                        onChange={this.props.handleChange}
                        options={this.props.options}                
                        isClearable={isClearable}
                        name={this.props.name}
                />
                
            </div> 
        )
    }
}
