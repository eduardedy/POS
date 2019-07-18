import React, { Component } from 'react'

export default class Button extends Component {
    render() {
        return (
            <div 
            onClick={this.props.onClick} 
            className="Button"
            data-value={this.props.value}
            data-size={this.props.size}
            >

                 {this.props.label}

            </div>
        )
    }
}