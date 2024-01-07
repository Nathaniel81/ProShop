import axios from "axios";
import { 
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL

 } from "../constants/userConstants";


 export const login = (username, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })
		const config = {
			headers: {
				'Content-type': 'application/json'
			}
		}

        const { data } = await axios.post(
			`http://127.0.0.1:8000/api/users/login`,
			{ 'username': username, 'password': password},
			config
			)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
		localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const logout = () => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGOUT })
		localStorage.removeItem('userInfo')

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const register = (username, email, password, password_confirm) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST })
		const config = {
			headers: {
				'Content-type': 'application/json'
			}
		}

        const { data } = await axios.post(
			`http://127.0.0.1:8000/api/users/register`,
			{ 
				'username': username,
				'email': email,
				'password': password,
				'password_confirm': password_confirm
			},
			config
			)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
		dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
		localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
