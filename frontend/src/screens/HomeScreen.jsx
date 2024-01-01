import {Row, Col} from 'react-bootstrap'
// import products from '../products'
import Products from '../components/Products'
import {useState, useEffect} from 'react';
import axios from 'axios';

const HomeScreen = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
     const fetchData = async() => {
      const res = await axios.get('http://127.0.0.1:8000/api/products');
      setProducts(res.data);
    }
    fetchData();
  }, [])

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