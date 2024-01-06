import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeScreen from "./screens/HomeScreen"
import ProductScreen from "./screens/ProductScreen"
import CartScreen from "./screens/CartScreen"
import LoginScreen from "./screens/LoginScreen"
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
            </Routes>
          </main>
        </Container>
      <Footer />
    </Router>
  )
}

export default App
