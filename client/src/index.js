import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import Layout from "./pages/Layout";
import Home from "./pages/Home";


export default function App() {
    return ( 
        <BrowserRouter>
        <Routes>
        <Route path = "/"
        element = { <Layout /> } >
        <Route index element = { <Chat /> } />  
        <Route path = "home"
        element = { <Home /> } /> 
        </Route> 
        </Routes>  </BrowserRouter >
    );
}

ReactDOM.render( <App/> , document.getElementById("root"));