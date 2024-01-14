import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { listProducts } from '../actions/productActions'


function SearchBox() {
    const [keyword, setKeyword] = useState('')

	const navigate = useNavigate()
    const location = useLocation();
    const dispatch = useDispatch();
	const {keyword: currentKeyword} = useParams()
    const submitHandler = (e) => {
        e.preventDefault()
        const currentPathname = window.location.pathname;
        // const params = new URLSearchParams(location.search);
        console.log(currentPathname)
        // console.log((location.pathname).split('/'))
        const admin = (location.pathname).split('/')[1]
        if (admin === 'admin') {
            if (keyword) {
                let navLink = `/admin/productlist/?keyword=${keyword}&page=${1}`;
                navigate(navLink);
                dispatch(listProducts(navLink.split('/admin/productlist/')[1]))
              } 
        } else {
            console.log('X')
            if (keyword) {
                navigate(`/?keyword=${keyword}&page=${1}`)
            } else {
                navigate(navigate(currentKeyword))
            }
        }
        
    }
    return (
        <Form onSubmit={submitHandler} inline={true}>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5'
            ></Form.Control>

            <Button
                type='submit'
                variant='outline-success'
                className='p-2'
            >
                Submit
            </Button>
        </Form>
    )
}

export default SearchBox