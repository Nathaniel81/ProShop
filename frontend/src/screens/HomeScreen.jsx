import {Row, Col} from 'react-bootstrap'
import products from '../products'
import Products from '../components/Products'

const HomeScreen = () => {
  return (
    <div>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
			<Products product={product}/>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomeScreen