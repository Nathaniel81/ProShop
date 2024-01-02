import {Row, Col} from 'react-bootstrap'
// import products from '../products'
import Products from '../components/Products'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';


const HomeScreen = () => {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const { error, loading, products } = productList;
  useEffect(() => {
    dispatch(listProducts())
    }, [dispatch])
  
    return (
      <div>
        <h1>Latest Products</h1>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <div>
                        <Row>
                            {products.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Products product={product} />
                                </Col>
                            ))}
                        </Row>
                        {/* <Paginate page={page} pages={pages} keyword={keyword} /> */}
                    </div>
            }
      </div>
    );
}
export default HomeScreen
