
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { ShopPage } from './components/ShopPage'
import { ProductPage } from './pages/ProductPage'
import { Header } from './components/Header'

function App() {
 return (
    <BrowserRouter>
    <Header></Header>
    <Routes>
        <Route path='/' element={<ShopPage/>}/>
        <Route path='/product/:id' element={<ProductPage/>}/>
        
    </Routes>
    </BrowserRouter>
 )
}

export default App
