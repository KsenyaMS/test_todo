import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import './App.css';
import ControlPanel from "./controlpanel/ControlPanel";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/test_todo/to_do">
          <ControlPanel/>
        </Route>
        <Route path="/test_todo">
          <Redirect to={'/test_todo/to_do'}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
