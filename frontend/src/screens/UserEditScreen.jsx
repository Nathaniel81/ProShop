import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function UserEditScreen() {

	const { id } = useParams()
	const navigate = useNavigate()

    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate

    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            navigate('/admin/userlist')
        } else {

            if (!user.name || user._id !== Number(id)) {
                dispatch(getUserDetails(id))
            } else {
                setUserName(user.username)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

    }, [user, id, successUpdate, navigate, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: user._id, username, email, isAdmin }))
    }

    return (
        <div>
            <Link to='/admin/userlist'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='username'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control

                                    type='username'
                                    placeholder='Enter name'
                                    value={username}
                                    onChange={(e) => setUserName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='email'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='isadmin'>
                                <Form.Check
                                    type='checkbox'
                                    label='Is Admin'
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                >
                                </Form.Check>
                            </Form.Group>

                            <Button type='submit' variant='primary' className='my-5'>
                                Update
                            </Button>

                        </Form>
                    )}

            </FormContainer >
        </div>

    )
}

export default UserEditScreen
