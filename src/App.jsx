import "./App.css";
import SideBar from "./components/SideBar/SideBar";
import NavBar from "./components/NavBar/NavBar";
import AppRoutes from "./util/AppRoutes";
import { Router } from "wouter";
import MainContainer from "./components/Containers/MainContainer/MainContainer";
import ContentContainer from "./components/Containers/ContentContainer/ContentContainer";

function App() {
  return (
    <Router>
      <MainContainer>
        <div className="container-fluid p-0" style={{ height: "5%" }}>
          <NavBar />
        </div>
        <div className="container-fluid p-0" style={{ height: "95%" }}>
          <div className="row p-0 m-0" style={{ height: "100%" }}>
            <SideBar />
            <ContentContainer>
              <AppRoutes />
            </ContentContainer>
          </div>
        </div>
      </MainContainer>
    </Router>
  );
}

export default App;
