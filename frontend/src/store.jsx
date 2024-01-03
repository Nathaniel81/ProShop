import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { productListReducers, productDetailReducers } from './reducers/ProductReducers';


const reducer = combineReducers({
	productList: productListReducers,
	productDetail: productDetailReducers
});
const initialState = {};
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
