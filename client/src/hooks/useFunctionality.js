import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkInCart, checkInFav } from '../store/counter/counter'
import {
  addToWishlist,
  deleteItemFromWishlist
} from '../store/wishlist/ActionCreator'
import {
  fetchAddToCart,
  fetchDeletaCardFromCart,
  fetchDeleteFromCart
} from '../store/cart/cart'

export const useFunctionality = id => {
  const [inFav, setInFav] = useState(false)
  const [inCart, setInCart] = useState(false)
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  const cardInCart = useSelector(state => state.cart.cart)
  const cardInFav = useSelector(state => state.wishlist.favItems)

  const checkValue = value => {
    return value != null
  }

  useEffect(() => {
    if (!token) {
      checkCardsFromLocalStorage('fav')
      checkCardsFromLocalStorage('cart')
    } else {
      checkCards(id)
    }
  }, [token ? (cardInCart, cardInFav) : null])

  const forFavActions = {
    localName: 'fav',
    counter: checkInFav,
    localState: setInFav,
    valueLocalState: inFav,
    deleteInServer: deleteItemFromWishlist,
    addInServer: addToWishlist
  }

  const forCartActions = {
    localName: 'cart',
    counter: checkInCart,
    localState: setInCart,
    valueLocalState: inCart,
    deleteInServer: fetchDeleteFromCart,
    addInServer: fetchAddToCart
  }

  const checkCardsFromLocalStorage = value => {
    let values
    if (value === 'fav') {
      values = forFavActions
    } else if (value === 'cart') {
      values = forCartActions
    }
    const { localName, counter, localState } = values
    const arrayFromLocalStorage = JSON.parse(localStorage.getItem(localName))
    if (arrayFromLocalStorage) {
      dispatch(counter(arrayFromLocalStorage.length))
      arrayFromLocalStorage.forEach(item => {
        if (item === id) {
          localState(true)
        }
      })
    }
  }

  const checkCards = id => {
    if (cardInCart.products) {
      const arrCard = cardInCart.products.map(item => {
        return item.product
      })
      const arrCardId = arrCard.map(item => {
        return item._id
      })
      if (arrCardId.includes(id)) {
        setInCart(true)
      }
    }

    if (cardInFav.products.length !== 0) {
      const arrFav = cardInFav.products
      const arrFavId = arrFav.products.map(item => {
        return item._id
      })
      if (arrFavId.includes(id)) {
        setInFav(true)
      }
    }
  }

  const actionOnCkickFavOrCart = (id, value) => {
    let values
    if (value === 'fav') {
      values = forFavActions
    } else if (value === 'cart') {
      values = forCartActions
    }
    const {
      localName,
      counter,
      localState,
      valueLocalState,
      deleteInServer,
      addInServer
    } = values

    if (!token) {
      const array = JSON.parse(localStorage.getItem(localName))
      if (array) {
        if (!array.includes(id)) {
          array.push(id)
          localStorage.setItem(localName, JSON.stringify(array))
          localState(true)
          dispatch(counter(array.length))
        } else {
          const newArray = array.map(item => {
            return item !== id ? item : null
          })
          const filter = newArray.filter(checkValue)
          dispatch(counter(filter.length))
          localStorage.setItem(localName, JSON.stringify(filter))
          localState(false)
        }
      } else {
        localStorage.setItem(localName, JSON.stringify([id]))
        localState(true)
        counter(1)
      }
    } else {
      if (valueLocalState) {
        dispatch(deleteInServer(id))
        localState(false)
      } else {
        dispatch(addInServer)
        localState(true)
      }
    }
  }

  const clickDeleteCardInCart = id => {
    if (token) {
      dispatch(fetchDeleteFromCart(id))
    } else {
      const cart = JSON.parse(localStorage.getItem('cart'))
      const arrayId = cart.map(el => {
        return el === id ? el : null
      })
      const arrayWithoutId = cart.map(el => {
        return el !== id ? el : null
      })
      const arrayWithoutIdFilter = arrayWithoutId.filter(checkValue)
      const arrayIdFilter = arrayId.filter(checkValue)
      const deleteId = arrayIdFilter.shift()
      const newArrayCart = arrayWithoutIdFilter.concat(arrayIdFilter)
      dispatch(checkInCart(newArrayCart.length))
      localStorage.setItem('cart', JSON.stringify(newArrayCart))
    }
  }

  const clickDeleteProductInCart = id => {
    if (token) {
      dispatch(fetchDeletaCardFromCart(id))
      setInCart(false)
    } else {
      const cart = JSON.parse(localStorage.getItem('cart'))
      const newCart = cart.map(item => {
        return item !== id ? item : null
      })
      const filter = newCart.filter(checkValue)
      dispatch(checkInCart(filter.length))
      localStorage.setItem('cart', JSON.stringify(filter))
      setInCart(false)
    }
  }

  const clickAddInCart = () => {
    if (token) {
      dispatch(fetchAddToCart(id))
    } else {
      const cart = JSON.parse(localStorage.getItem('cart'))
      cart.push(id)
      localStorage.setItem('cart', JSON.stringify(cart))
      dispatch(checkInCart(cart.length))
    }
  }

  return {
    inFav,
    inCart,
    setInFav,
    clickDeleteCardInCart,
    clickAddInCart,
    clickDeleteProductInCart,
    actionOnCkickFavOrCart
  }
}
