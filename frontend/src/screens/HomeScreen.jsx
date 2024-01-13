import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Products from '../components/Products';
import { listProducts } from '../actions/productActions';
import { useLocation } from 'react-router-dom';


const HomeScreen = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();

  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  const queryParams = new URLSearchParams(search);
  const keyword = queryParams.get('keyword');
  const queryStr = keyword ? `?keyword=${keyword}` : '';

  useEffect(() => {
    dispatch(listProducts(queryStr));
  }, [dispatch, queryStr]);

  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Products product={product} />
              </Col>
            ))}
          </Row>
          {/* <Paginate page={page} pages={pages} keyword={keyword} /> */}
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
