// import React from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { Image, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
// import products from '../products';
import Rating from '../components/Rating';
import axios from 'axios';
import { useEffect, useState } from 'react';



const ProductScreen = () => {
	const { id } = useParams();
	const [products, setProducts] = useState([])
    useEffect(() => {
    const fetchData = async() => {
    const res = await axios.get('http://127.0.0.1:8000/api/products');
    console.log(res)
    setProducts(res.data);
    }
    fetchData();
  }, [])
	const product = products.find((p) => p._id === id)
    return (
	<div>
		<Link to='/' className='btn btn-light my-3'>Go Back</Link>
		<Row>
			<Col md={6}>
				<Image src={product.image} alt={product.name} fluid/>
			</Col>
			<Col md={3}>
				<ListGroup variant='flush'>
					<ListGroup.Item>
						<h3>{product.name}</h3>
					</ListGroup.Item>
					<ListGroup.Item>
						<Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
					</ListGroup.Item>
					<ListGroup.Item>
						Price: ${product.price}
					</ListGroup.Item>
					<ListGroup.Item>
						Description: ${product.description}
					</ListGroup.Item>
				</ListGroup>
			</Col>
			<Col md={3}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                       <Row>
                          <Col>Price: </Col>
                          <Col><strong>${product.price}</strong></Col>
                       </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                           <Col>Status: </Col>
                           <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button
                            className='btn-block'
							disabled={product.countInStock == 0}
                            type='button'>
                            Add to Cart
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
			</Col>
		</Row>
	</div>
  )
}

// ProductScreen.propTypes = {}

export default ProductScreen