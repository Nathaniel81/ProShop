import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Products from '../components/Products';
import Paginate from '../components/Paginate';
import { listProducts } from '../actions/productActions';
import { useLocation } from 'react-router-dom';
import ProductCarousel from '../components/ProductCarousel'


const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList

  const location = useLocation();
  let keywords = location.pathname + location.search
  if (keywords === '/'){
    keywords = ''
  } 
  console.log(keywords)  
  useEffect(() => {
    dispatch(listProducts(keywords));
  }, [dispatch, keywords]);

  return (
    <div>
      {!keywords && <ProductCarousel />}
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
          <Paginate page={page} pages={pages} keywords={keywords} />
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
