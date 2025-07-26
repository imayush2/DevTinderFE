import Body from "./components/Body";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile";
import appStore from "./utils/appStore";
import { Provider } from 'react-redux'
import Feed from "./components/Feed";
import Connection from "./components/Connection";
import Request from "./components/Request"
import SignUp from "./components/SignUp";

function App() {
  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/connections" element={<Connection />} />
            <Route path="/requests" element={<Request />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>

      {/* <Navbar></Navbar> */}
    </>
  );
}

export default App;
