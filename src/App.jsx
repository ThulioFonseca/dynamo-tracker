import "./App.css";
import SideBar from "./components/SideBar/SideBar";
import NavBar from "./components/NavBar/NavBar";
import AppRoutes from "./util/AppRoutes";
import { Router } from "wouter";
import MainContainer from "./components/Containers/MainContainer/MainContainer";
import ContentContainer from "./components/Containers/ContentContainer/ContentContainer";
import 'bootstrap/dist/css/bootstrap.min.css';
import { NotificationProvider } from "./contexts/NotificationProvider/NotificationProvider";

function App() {
  return (
    <NotificationProvider>
    <Router>
      <MainContainer>
        <NavBar />
        <div className="container-fluid p-0 m-0 d-flex">
          <SideBar />
          <ContentContainer>
            <AppRoutes />
          </ContentContainer>
        </div>
      </MainContainer>
    </Router>
    </NotificationProvider>
  );
}

export default App;
