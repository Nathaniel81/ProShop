import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeScreen from "./screens/HomeScreen"
import RegisterScreen from "./screens/RegisterScreen"
import ProductScreen from "./screens/ProductScreen"
import CartScreen from "./screens/CartScreen"
import LoginScreen from "./screens/LoginScreen"
import ProfileScreen from "./screens/ProfileScreen"
import ShippingScreen from "./screens/ShippingScreen"
import PaymentScreen from "./screens/PaymentScreen"
import PlaceOrderScreen from "./screens/PlaceorderScreen"
import OrderScreen from "./screens/OrderScreen"
import UserListScreen from "./screens/UserListScreen"
import UserEditScreen from "./screens/UserEditScreen"
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from "./screens/ProductEditScreen"
import OrderListScreen from "./screens/OrderListScreen"
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Header />
        <Container>
          <main className='py-3'>
            <Routes>
              <Route path="/" Component={HomeScreen} exact />
              <Route path="/product/:id" Component={ProductScreen} />
              <Route path="/login" Component={LoginScreen} exact />
              <Route path="/cart/:id?" Component={CartScreen} />
              <Route path="/register" Component={RegisterScreen} />
              <Route path="/profile" Component={ProfileScreen} />
              <Route path="/shipping" Component={ShippingScreen} />
              <Route path="/payment" Component={PaymentScreen} />
              <Route path="/payment" Component={PaymentScreen} />
              <Route path="/PlaceOrder" Component={PlaceOrderScreen} />
              <Route path="/order/:id" Component={OrderScreen} />
              <Route path="/admin/userlist" Component={UserListScreen} />
              <Route path="/admin/user/:id/edit" Component={UserEditScreen} />
              <Route path='/admin/productlist' Component={ProductListScreen} />
              <Route path='/admin/product/:id/edit' Component={ProductEditScreen} />
              <Route path='/admin/orderlist' Component={OrderListScreen} />
            </Routes>
          </main>
        </Container>
      <Footer />
    </Router>
  )
}

export default App
