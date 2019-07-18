import React from 'react'
import { Link}  from 'react-router-dom'

import FormInput from '../FORM/FormInput'
import FormSelect from '../FORM/FormSelect'

export default class EntriesFilter extends React.Component {
    render() {

        const testare = {
            backgroundColor: '#1ab394',
            border: '1px solid #1ab394',
            color: '#FFFFFF',
            padding: '0.25rem 0.5rem',
            fontSize: '0.7875rem',
            lineHeight: '1.5',
            borderRadius: '0.2rem',
            bottom: '3px',
            position: 'relative'
        }
        
        return (
            <div>                           

              <div className="row">
                    <div className="col-sm-10">                       
                        <button  style={testare} data-toggle="collapse" data-target="#demo">Collapsible</button>
                        <div id="demo" className="collapse">                                                       
                            <div className="container  ">
                                <form>
                                    {/* <div className="form-group row">
                                        <FormSelect className="col-sm-12  test"  
                                                    name="name" 
                                        />
                                    </div> */}

                                    <div className="form-group row">
                                        <FormInput type="text"
                                                    colSm="col-sm-3" 
                                                    id="nr_doc"
                                                    name="nr_doc" 
                                        />

                                        <FormSelect className="col-sm-6 test" /> 
                                    </div>




                                    <div className="form-group row">
                                        <FormSelect className="col-sm-6 test" /> 

                                        <FormSelect className="col-sm-6 test" /> 
                                    </div>






                                    <div className="form-group row">
                                        <FormSelect className="col-sm-6 test" /> 

                                        <FormSelect className="col-sm-6 test" /> 
                                    </div>








                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-2">
                        <Link to="/entries/create" exact="true" className="btn btn-primary btn-sm"> 
                            <i className="fa fa-plus"></i> Adauga 
                        </Link> 
                    </div>
 
                </div>
            </div>
        )
    }
}