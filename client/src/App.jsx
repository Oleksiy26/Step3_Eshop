import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AuthContext } from './context/AuthContext'
import { fetchProducts } from './store/products/productSlice'
import { login } from './store/tokenWork/tokenWork'
import { fetchAddToCart, fetchGetAllFromCart } from './store/cart/cart'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import AppRouter from './router/AppRouter'
import { fetchWishlist } from './store/wishlist/ActionCreator'
import { useLocation } from 'react-router-dom'
import { checkLocation } from './store/location/location'
import './styles/App.scss'

function App() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  const locationLogin = useSelector(state => state.location.locationLogin)
  const isAuthenticated = !!token
  const location = useLocation()

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(checkLocation(location.pathname))
    const data = JSON.parse(localStorage.getItem('userToken'))
    if (data && data.token) dispatch(login(data.token))
    if (token) {
      dispatch(fetchGetAllFromCart())
      dispatch(fetchWishlist())

      const cards = JSON.parse(localStorage.getItem('cart'))
      if (JSON.parse(localStorage.getItem('cart'))) {
        cards.map(item => dispatch(fetchAddToCart(item)))
        localStorage.removeItem('cart')
      }
    }
  }, [dispatch, token, locationLogin, location.pathname])

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated
      }}
    >
      <Header />
      <AppRouter isAuthenticated={isAuthenticated} />
      {!locationLogin ? <Footer /> : null}
    </AuthContext.Provider>
  )
}

export default App

// for EsLint

// "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }]
// "no-console": "error"
// "scripts": {
//   "lint": "eslint --fix --ext .js,.jsx ."
// }
