import { useSelector, useDispatch } from 'react-redux';
import { counterActions } from '../store/counter';

import classes from './Counter.module.css';

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter.counter); // need to pass a function to the useSelector, a function which will be executed by React Redux, that basically determines which piece of data we want to extract from the store
  const show = useSelector(state => state.counter.showCounter);

  const incrementHandler = () => {
    // dispatch({ type: 'increment' });
    dispatch(counterActions.increment())
  };

  const increaseHandler = () => {
    // dispatch({ type: 'increase', amount: 5 })
    dispatch(counterActions.increase(5));
  }

  const decrementHandler = () => {
    // dispatch({ type: 'decrement' });
    dispatch(counterActions.decrement());
  };

  const toggleCounterHandler = () => {
    // dispatch({ type: 'toggle' })
    dispatch(counterActions.toggleCounter());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
