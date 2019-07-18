import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icon from '@fortawesome/free-solid-svg-icons'

export default class FormInput extends Component {
    render() {
        return (  
            <div className={`form-group ${this.props.colSm}`}>
            {/* show label or icon instead, only if it's set */}
                { this.props.for ? <label htmlFor={this.props.for}>{this.props.label}</label> : null }

                { this.props.icon ? <i className="icon"> <FontAwesomeIcon icon={this.props.icon} /> </i> : null }

                <input type={this.props.type}
                       className= {`form-control form-control-lg ${this.props.errorClass}`}
                       id={this.props.id}
                       name={this.props.name}
                       value={this.props.value}
                       onChange={this.props.onChange}
                       autoFocus={this.props.autoFocus}
                       placeholder={this.props.placeholder}
                />
            </div>
        )
    }
}