import { Route, Switch } from "wouter";
import Home from "../pages/Home/Home";
import Devices from "../pages/Devices/Devices";
import Settings from "../pages/Settings/Settings";
import AppLogs from "../pages/AppLogs/AppLogs";
import NotFound from "../pages/NotFound/NotFound";

export default function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/Home" component={Home}/>
      <Route path="/devices" component={Devices}/>
      <Route path="/settings" component={Settings}/>
      <Route path="/logs"  component={AppLogs} />
      <Route path="*" component={NotFound}></Route>
    </Switch>
  );
}
