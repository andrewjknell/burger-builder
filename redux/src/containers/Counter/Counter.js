import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actions from '../../store/actions';

class Counter extends Component {

    render() {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter} />
                <CounterControl label="Add 5" clicked={this.props.onIncrement5Counter} />
                <CounterControl label="Subtract 5" clicked={this.props.onDecrement5Counter} />
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
        onIncrementCounter: () => dispatch({ type: actions.INCREMENT, value: 1 }),
        onDecrementCounter: () => dispatch({ type: actions.DECREMENT, value: 1 }),
        onIncrement5Counter: () => dispatch({ type: actions.ADD, value: 10 }),
        onDecrement5Counter: () => dispatch({ type: actions.SUB, value: 10 }),
        onStoreResult: (res) => dispatch({ type: actions.UPDATE,  value: res}),
        onDeleteResult: (id) => dispatch({ type: actions.DELETE, id: id }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);