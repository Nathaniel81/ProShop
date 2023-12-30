import {Row, Col} from 'react-bootstrap'
import products from '../products'
import Products from '../components/Products'

const HomeScreen = () => {
  return (
    <div>
      <Row>
        {products.map((p) => (
          <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
            {/* <h3>{p.name}</h3> */}
			<Products />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomeScreen