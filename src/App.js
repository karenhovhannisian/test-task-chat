import React from 'react';
import Chat from "../src/components/Chat"
import AuthModal from "./components/AuthModal";
import MainContext from "./hooks/mainContext";
import {useAuth} from "./hooks/useAuth";
import './styles/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Spinner} from "reactstrap";


function App() {

  const { initializing, user } = useAuth();
    if (initializing) {
        return   <div className={"text-center"}><Spinner color="primary" /></div>

    }
  return (
   <MainContext.Provider value={{ user }}>
        <Chat/>
       {!user && <AuthModal/>}
   </MainContext.Provider>
  );
}

export default App;
