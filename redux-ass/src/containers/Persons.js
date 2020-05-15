import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';

class Persons extends Component {

    render () {
        return (
            <div>
                <AddPerson personAdded={this.props.onClickAdd} />
                {this.props.prsn.map(prsn => (
                    <Person 
                        key={prsn.id}
                        name={prsn.name} 
                        age={prsn.age} 
                        clicked={() => this.props.onClickDelete(prsn.id)}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        prsn: state.persons
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onClickAdd: (name, age) => dispatch({ type: actions.ADD, name: name, age: age}),
        onClickDelete: (id) => dispatch({ type: actions.DELETE, id: id})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Persons);