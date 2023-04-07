import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import './App.css';
import ControlPanel from "./controlpanel/ControlPanel";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/to_do">
          <ControlPanel/>
        </Route>
        <Route path="/">
          <Redirect to={'/to_do'}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
