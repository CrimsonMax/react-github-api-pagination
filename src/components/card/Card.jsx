import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getContributors, getCurrentRepo } from '../actions/repos'
import './Card.less'

const Card = (props) => {

  const [repo, setRepo] = useState({ owner: {} })
  const [contributors, setContributors] = useState([])
  const { username, reponame } = useParams()

  useEffect(() => {
    getCurrentRepo(username, reponame, setRepo)
    getContributors(username, reponame, setContributors)
  }, [])

  return (
    <div>
      <button onClick={() => props.history.goBack()} className="back-btn">BACK</button>
      <div className="card">
        <img src={repo.owner.avatar_url} alt="" />
        <div className="name">{repo.name}</div>
        <div className="stars">{repo.stargazer_count}</div>
      </div>
      {
        contributors.map((elem, index) => <div>{index + 1}. {elem.login}</div>)
      }
    </div>
  )
}

export default Card