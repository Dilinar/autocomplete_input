import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { 
  createStore, 
  applyMiddleware 
} from 'redux';
import thunk from 'redux-thunk';

import Input from './components/Input/Input';
import reducers from './reducers';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Input /> 
  </Provider>,
  document.getElementById('root')
);
