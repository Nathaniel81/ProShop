import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom';

const Products = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`} className='link-no-underline'>
        <Card.Img src={product.image} />
        <Card.Body>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>

          <Card.Text as="div">
            <div className="my-3">
              <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
            </div>
          </Card.Text>

          <Card.Text as="h3">
            ${product.price}
          </Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
};

Products.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    rating: PropTypes.number,
    numReviews: PropTypes.number.isRequired,
  }).isRequired,
};

export default Products;
