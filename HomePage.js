import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Component1 from './comp1';
import Component2 from './comp2';
//import Component4 from './comp4';
//import Component5 from './comp5';
import './HomePage.css';

class HomePage extends Component {
    render() {
        return (
            <div>
                <Component1 /> <Component2 />
            </div>
        );
    };
}
export default HomePage;