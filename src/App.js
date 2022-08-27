import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import DashBoard from "./pages/DashBoard";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import "antd/dist/antd.css";
import { createBrowserHistory } from "history";
export const history = createBrowserHistory();
function App() {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/" exact component={DashBoard} />
          <Route path="/orders" exact component={Orders} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
