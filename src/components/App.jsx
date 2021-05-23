import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import './App.less'
import Card from './card/Card'
import Error from './main/Error'
import Main from './main/Main'

const App = () => {

  const dispatch = useDispatch()

  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route path='/' component={Main} exact />
          <Route path='/card/:username/:reponame' component={Card} />
          <Route path='/error' component={Error} />
          <Redirect to='/' />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App