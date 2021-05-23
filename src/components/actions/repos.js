import axios from "axios"
import { setFetchError, setIsFetching, setRepos } from "../../reducers/reposReducer"

export const getRepos = (searchQuery = 'stars:%3E1', currentPage, perPage) => {

  if (searchQuery == '') {
    searchQuery = 'stars:%3E1'
  }

  return async (dispatch) => {
    try {
      dispatch(setIsFetching(true))
      const responce = await axios.get(
        `https://api.github.com/search/repositories?q=${searchQuery}&sort=stars&per_page=${perPage}&page=${currentPage}`
      )
      dispatch(setRepos(responce.data))
    } catch (error) {
      dispatch(setFetchError(true))
      dispatch(setIsFetching(false))
      setTimeout(() => {
        dispatch(setFetchError(false))
      }, 2000)
    }
  }
}

export const getCurrentRepo = async (username, repoName, setRepo) => {
  const responce = await axios.get(`https://api.github.com/repos/${username}/${repoName}`)
  setRepo(responce.data)
}

export const getContributors = async (username, repoName, setContributors) => {
  const responce = await axios.get(`https://api.github.com/repos/${username}/${repoName}/contributors?page=1&per_page=10`)
  setContributors(responce.data)
}