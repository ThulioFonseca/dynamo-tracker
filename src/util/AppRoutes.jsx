import { Route, Switch } from "wouter";
import Home from "../pages/Home/Home";
import Devices from "../pages/Devices/Devices";
import Settings from "../pages/Settings/Settings";
import Logs from "../pages/Logs/Logs";

export default function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/Home" component={Home}/>
      <Route path="/devices" component={Devices}/>
      <Route path="/settings" component={Settings}/>
      <Route path="/logs"  component={Logs} />
      <Route>404: No such page!</Route>
    </Switch>
  );
}
