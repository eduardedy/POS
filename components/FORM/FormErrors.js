import React from 'react'

export default class FormErrors extends React.Component {
    render() {
        return(
            <div className="paragraph-err-msg">
                {
                  Object.keys(this.props.formErrors).map((fieldName, i)=>{ 
                      if(this.props.formErrors[fieldName].length > 0){                          
                          return <p key={i}>{ this.props.formErrors[fieldName] }</p>
                      }else{
                          return ''
                      }
                  })
                }             
            </div>
        )
    }
}