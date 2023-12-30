import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeScreen from "./screens/HomeScreen"
import { Container } from 'react-bootstrap'


function App() {
  return (
    <>
      <Header />
        <Container>
          <main className=''>
            <HomeScreen />
          </main>
        </Container>
      <Footer />
    </>
  )
}

export default App
