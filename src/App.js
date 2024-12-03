import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/Login" component={Login} />
  </Switch>
)

export default App
