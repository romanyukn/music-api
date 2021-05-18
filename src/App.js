import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import ArtistsList from './components/ArtistsList';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" children={<ArtistsList/>}/>
        <Route path="/:country" children={<ArtistsList/>}/>
      </Switch>
    </Router>
  );
}

export default App;
