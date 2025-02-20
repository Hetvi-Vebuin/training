import { Route, Routes } from "react-router";
import NoMatch from "../components/pages/NoMatch";
import PrivateRoute from "./PrivateRoute";
import { LoginPage } from "../components/pages/LoginPage";

import { RegisterPage } from "../components/pages/RegisterPage";
import Dashboard from "../components/pages/Dashboard";
// import PublicRoute from "./PublicRoute";

const AppRoutes=()=>{
    return ( 
      <Routes>

        <Route element={<PrivateRoute/>}>
          <Route path="dashboard" element={<Dashboard/>} />
        </Route>
        <Route path="login" element={<LoginPage/>} />
        <Route path="register" element={<RegisterPage/>} />

        {/* <Route element={<PublicRoute />}> */}
          {/* <Route path="/" element={<Home/>} /> */}
          {/* <Route path="*" element={<NoMatch />} /> */}
        {/* </Route> */}

        <Route path="*" element={<NoMatch />} />

      </Routes>
     );
}
 
export default AppRoutes;