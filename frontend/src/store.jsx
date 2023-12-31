import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { productListReducers, productDetailReducers } from './reducers/ProductReducers';
import { cartReducer } from './reducers/cartReducers';
import { userReducer, newUserReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducers';
import { orderCreateReducer } from './reducers/orderReducers';

const reducer = combineReducers({
	productList: productListReducers,
	productDetail: productDetailReducers,

	cart: cartReducer,

	userLogin: userReducer,
	userRegister: newUserReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,

	orderCreate: orderCreateReducer,
});

const middleware = [thunk];
const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}
const initialState = {
	cart: {
		cartItems: cartItemsFromStorage,
		shippingAddress: shippingAddressFromStorage,
	},
	userLogin: { userInfo: userInfoFromStorage },
}
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));


export default store;
