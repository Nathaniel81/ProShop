import axios from 'axios'
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    // USER_DETAILS_RESET,

    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    // USER_UPDATE_PROFILE_RESET,

    // USER_LIST_REQUEST,
    // USER_LIST_SUCCESS,
    // USER_LIST_FAIL,
    // USER_LIST_RESET,

    // USER_DELETE_REQUEST,
    // USER_DELETE_SUCCESS,
    // USER_DELETE_FAIL,

    // USER_UPDATE_REQUEST,
    // USER_UPDATE_SUCCESS,
    // USER_UPDATE_FAIL,

} from '../constants/userConstants'

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
			{ 'username': username, 'password': password },
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

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `http://127.0.0.1:8000/api/users/${id}/`,
            config
        )

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        console.log(user)
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const { data } = await axios.put(
            `http://127.0.0.1:8000/api/users/update/`,
            user,
            config
        )

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}