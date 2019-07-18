import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route, NavLink} from 'react-router-dom'
import Home from './Home'
import Nomenclator from './NOMENCLATOR/Nomenclator'
import Form from './NOMENCLATOR/Form'
import FormEdit from './NOMENCLATOR/FormEdit'
import Entries from './Entries/Entries'
import NewEntry from './Entries/NewEntry'

export default class Index extends Component { 
    
    render() {    
        return (
            <div > 
                <Router>
                    <div>
                        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-pos">
                            <NavLink to="/home" activeStyle={{color: '#f4d85f', marginTop: '-2px', boxShadow: '2px 2px 8px rgb(244, 216, 95)', padding: '4px'}} exact className="navbar-brand">Vanzare</NavLink> 
                            <NavLink to="/nomenclator" activeStyle={{color: '#f4d85f', marginTop: '-2px', boxShadow: '2px 2px 8px rgb(244, 216, 95)', padding: '4px'}} exact  className="navbar-brand">Nomenclator</NavLink>                        
                            <NavLink to="/entries" activeStyle={{color: '#f4d85f', marginTop: '-2px', boxShadow: '2px 2px 8px rgb(244, 216, 95)', padding: '4px'}} exact className="navbar-brand">Receptii </NavLink>
                        </nav>
                    
                        <Route path="/home" exact component={Home} />
                        <Route path="/nomenclator" exact component={Nomenclator} />
                        <Route path="/nomenclator/create" exact component={Form} /> 
                        <Route path="/nomenclator/edit/:id" exact component={FormEdit} />  
                        <Route path="/entries" exact component={Entries} />      
                        <Route path="/entries/create" exact component={NewEntry} />                   
                    </div>
                </Router>               
            </div>
        )
    }

}

if (document.getElementById('root')) {
    ReactDOM.render(<Index />, document.getElementById('root'));
}
