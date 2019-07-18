import React from 'react'

export default class AlertMessage extends React.Component {
    render() {
        return (         
            <div className={`alert ${this.props.alertModel}  `}>
                <button type="button" className='close closeModalStyle' onClick={this.props.onClickHide}> &times; </button>
                <p dangerouslySetInnerHTML={{__html: this.props.message }}  />                     
            </div>  
        )
    }
}