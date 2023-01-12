import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setstartPage } from '../../store/filter/filterSlice'
import './Pagination.scss'

const Pagination = () => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.filter.products)
  const startPage = useSelector(state => state.filter.startPage)
  const perPage = useSelector(state => state.filter.perPage)
  const totalCount = products.productsQuantity
  const pagesCount = Math.ceil(totalCount / perPage)

  function filler(pages, pagesCount) {
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i)
    }
  }

  const pages = []
  filler(pages, pagesCount)

  return (
    <div className='pages'>
      {pages.map((page, index) => (
        <span
          key={index}
          className={startPage === page ? 'start-page-number' : 'page-number'}
          onClick={() => dispatch(setstartPage(page))}
        >
          {page}
        </span>
      ))}
    </div>
  )
}
export default Pagination
