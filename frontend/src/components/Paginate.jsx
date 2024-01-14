import { Pagination } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
// import { LinkContainer } from 'react-router-bootstrap';
import { listProducts } from '../actions/productActions';
import { useDispatch } from 'react-redux';
function Paginate({ pages, page, keyword = '', isAdmin = false }) {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();
	
	let keywords = location.pathname + location.search
	if (keywords === '/') {
		keywords = ''
	}
	const navTo = (x) => {
		const existingQuery = new URLSearchParams(location.search);
		existingQuery.set('page', x)
		if (isAdmin) {
			navigate(`/admin/productlist?keyword=${keywords}&page=${x}`);
			let params = `?keyword=${keyword}&page=${x}`
			dispatch(listProducts(params))
		} else {
			navigate({
				pathname: '/',
				search: existingQuery.toString(),
			});
		}
}
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
            <Pagination.Item key={x} active={x === page - 1} onClick={() => navTo(x+1)}>{x + 1}</Pagination.Item>
        ))}
      </Pagination>
    )
  );
}

export default Paginate;