
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { ShopPage } from './components/ShopPage'
import { ProductPage } from './pages/ProductPage'
import { Header } from './components/Header'
import { SearchPage } from './pages/SearchPage'

function App() {
 return (
    <BrowserRouter>
    <Header></Header>
    <Routes>
        <Route path='/' element={<ShopPage/>}/>
        <Route path='/product/:id' element={<ProductPage/>}/>
        <Route path='/search' element={<SearchPage/>}/>
    </Routes>
    </BrowserRouter>
 )
}

export default App
