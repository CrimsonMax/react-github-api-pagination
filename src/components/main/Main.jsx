import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { setCurrentPage } from '../../reducers/reposReducer'
import { createPages } from '../../util/pagesCreator'
import { getRepos } from '../actions/repos'
import './Main.less'
import Repo from './repo/Repo'

const Main = () => {

  const [searchValue, setSearchValue] = useState('')

  const dispatch = useDispatch()

  const repos = useSelector(state => state.repos.items)
  const isFetching = useSelector(state => state.repos.isFetching)
  const currentPage = useSelector(state => state.repos.currentPage)
  const totalCount = useSelector(state => state.repos.totalCount)
  const isFetchError = useSelector(state => state.repos.isFetchError)

  const perPage = useSelector(state => state.repos.perPage)

  const pagesCount = Math.ceil(totalCount / perPage)

  const pages = []
  createPages(pages, pagesCount, currentPage)


  useEffect(() => {
    dispatch(getRepos(searchValue, currentPage, perPage))
  }, [currentPage])

  function searchHandler() {
    dispatch(currentPage(1))
    dispatch(getRepos(searchValue, currentPage, perPage))
  }

  // if (isFetchError) {
  //   return <Redirect to='/error' />
  // }

  return (
    <div>
      {
        isFetchError &&
        <div class="alert alert-danger" role="alert">
          Oh no!
        </div>
      }
      <div className="search">
        <input value={searchValue} onChange={e => setSearchValue(e.target.value)} type="text" placeholder='Input repo name' className="search-input" />
        <button onClick={() => searchHandler()} className="search-btn">Search</button>
      </div>
      {
        isFetching === false ?
          repos.map(elem => <Repo key={Math.floor(Math.random() * 100000000)} repo={elem} />)
          :
          <div className="fetching">

          </div>
      }

      <div className="pages">
        {
          pages.map(
            (elem, index) =>
              <span
                key={index}
                className={currentPage == elem ? 'current-page' : 'page'}
                onClick={() => dispatch(setCurrentPage(elem))}
              >
                {elem}
              </span>
          )
        }
      </div>
    </div >
  )
}

export default Main