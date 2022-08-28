import { Switch, Route } from "react-router-dom";
import "./App.css";
import { Router } from "react-router";
import DashBoard from "./pages/DashBoard";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import "antd/dist/antd.css";
import createHistory from "history/createBrowserHistory";
const history = createHistory();
function App() {
  return (
    <Router history={history}>
      <Route path="/" exact>
        <Login />
      </Route>
      <Route path="/dashboard" exact component={DashBoard} />
      <Route path="/orders" exact component={Orders} />
    </Router>
  );
}

export default App;
