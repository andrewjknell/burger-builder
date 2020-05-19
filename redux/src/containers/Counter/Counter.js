import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {

    render() {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter} />
                <CounterControl label="Add 10" clicked={this.props.onIncrement5Counter} />
                <CounterControl label="Subtract 10" clicked={this.props.onDecrement5Counter} />
                <hr />
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>store result</button>
                <ul>
                    {this.props.storedResutls.map(res => (
                        <li key={res.id} onClick={() => this.props.onDeleteResult(res.id)}>{res.value}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ctr: state.ctr.counter,
        storedResutls: state.res.results
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch(actionCreators.increment()),
        onDecrementCounter: () => dispatch(actionCreators.decrement()),
        onIncrement5Counter: () => dispatch(actionCreators.add()),
        onDecrement5Counter: () => dispatch(actionCreators.sub()),
        onStoreResult: (res) => dispatch(actionCreators.update(res)),
        onDeleteResult: (id) => dispatch(actionCreators.delet(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);