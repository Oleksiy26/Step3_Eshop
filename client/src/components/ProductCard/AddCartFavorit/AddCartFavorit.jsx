import React from 'react'
import Favicon from './Favicon/Favicon'
import './AddCartFavorit.scss'
import Button from '../../Button/Button'
import PropTypes from 'prop-types'
import { useFunctionality } from '../../../hooks/useFunctionality'

const AddCartFavorit = ({ subClasss, currentId }) => {
  const { inFav, inCart, clickFav, clickToCart, actionOnCkickFavOrCart } =
    useFunctionality(currentId)

  const addItemToCart = event => {
    event.stopPropagation()
    actionOnCkickFavOrCart(currentId, 'cart')
  }

  const addItemToWishlist = event => {
    event.stopPropagation()
    actionOnCkickFavOrCart(currentId, 'fav')
  }

  return (
    <div className={'set-hover ' + subClasss}>
      <Button
        onClick={addItemToCart}
        className='set-addcart'
        text={!inCart ? 'Add to cart' : 'Delete from cart'}
      />
      <div className='set-addfavorit'>
        <Favicon onClick={addItemToWishlist} inFav={inFav} />
      </div>
    </div>
  )
}

AddCartFavorit.propTypes = {
  cardId: PropTypes.string,
  subClasss: PropTypes.string
}

export default AddCartFavorit
