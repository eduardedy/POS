import React, { Component } from 'react'  

export default class Buttons extends Component {
    render() {
        return <div className="Buttons"> { this.props.children } </div> 
    }
}