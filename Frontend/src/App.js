import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { VerificationProvider } from "./VerificationContext";
import VerificationComponent from "./VerificationComponent";
import Home from "./components/Home";
import VerifyAdmin from "./components/VerifyAdmin";
import VerifyStudent from "./components/VerifyStudent";
import Admin from "./components/Admin";
import Student from "./components/Student";
import AddAdmins from "./components/AddAdmins";
import AddStudent from "./components/AddStudent";
import Comp from "./components/Comp";
import Entc from "./components/Entc";
import Mech from "./components/Mech";
import Chem from "./components/Chem";
import OperatingSystem from "./components/OperatingSystem";
import Dbms from "./components/Dbms";
import NewPost from "./components/NewPost";
import DbmsPost from "./components/DbmsPost";
import DigitalElectronics from "./components/DigitalElectronics";
import CommSystem from "./components/CommSystem";
import DEpost from "./components/DEpost";
import CSpost from "./components/CSpost";
import Thermodynamics from "./components/Thermodynamics";
import FluidMechanics from "./components/FluidMechanics";
import ThermoPost from "./components/ThermoPost";
import FluidMechPost from "./components/FluidMechPost";
import BiochemEng from "./components/BiochemEng";
import BiochemPost from "./components/BiochemPost";
import WasteManagement from "./components/WasteManagement";
import WasteManagePost from "./components/WasteManagePost";
import DbmsEditpost from "./components/DbmsEditPost";
import OsEditpost from "./components/OsEditPost";
import DEeditpost from "./components/DEeditPost";
import CSeditPost from "./components/CSeditPost";
import ThermodynamicsEdit from "./components/ThermodynamicsEdit";
import FluidMechEdit from "./components/FluidMechEdit";
import BiochemEdit from "./components/BiochemEdit";
import WasteManageEdit from "./components/WasteManageEdit";


const App = () => {
  return (
    <Router>
      <VerificationProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/verify-admin" element={<VerifyAdmin />} />
          <Route path="/verify-student" element={<VerifyStudent />} />
          <Route path="/admin/*" element={<VerificationComponent role="admin"><Admin /></VerificationComponent>} />
          <Route path="/admin/add-admins" element={<VerificationComponent role="admin"><AddAdmins /></VerificationComponent>} />
          <Route path="/admin/add-student" element={<VerificationComponent role="admin"><AddStudent /></VerificationComponent>} />
          <Route path="/student/*" element={<VerificationComponent role="student"><Student /></VerificationComponent>} />
          <Route path="/student/comp" element={<VerificationComponent role="student"><Comp /></VerificationComponent>} />
          <Route path="/student/comp/os" element={<VerificationComponent role="student"><OperatingSystem /></VerificationComponent>} />
          <Route path="/student/comp/os/newpost" element={<VerificationComponent role="student"><NewPost /></VerificationComponent>} />
          <Route path="/student/comp/os/editpost" element={<VerificationComponent role="student"><OsEditpost /></VerificationComponent>} />
          <Route path="/student/comp/dbms" element={<VerificationComponent role="student"><Dbms /></VerificationComponent>} />
          <Route path="/student/comp/dbms/dbmspost" element={<VerificationComponent role="student"><DbmsPost /></VerificationComponent>} />
          <Route path="/student/comp/dbms/editpost" element={<VerificationComponent role="student"><DbmsEditpost /></VerificationComponent>} />
          <Route path="/student/entc" element={<VerificationComponent role="student"><Entc /></VerificationComponent>} />
          <Route path="/student/entc/digital-electronics" element={<VerificationComponent role="student"><DigitalElectronics /></VerificationComponent>} />
          <Route path="/student/entc/digital-electronics/newpost" element={<VerificationComponent role="student"><DEpost /></VerificationComponent>} />
          <Route path="/student/entc/digital-electronics/editpost" element={<VerificationComponent role="student"><DEeditpost /></VerificationComponent>} />
          <Route path="/student/entc/communication-systems" element={<VerificationComponent role="student"><CommSystem /></VerificationComponent>} />
          <Route path="/student/entc/communication-systems/newpost" element={<VerificationComponent role="student"><CSpost /></VerificationComponent>} />
          <Route path="/student/entc/communication-systems/editpost" element={<VerificationComponent role="student"><CSeditPost /></VerificationComponent>} />
          <Route path="/student/mech" element={<VerificationComponent role="student"><Mech /></VerificationComponent>} />
          <Route path="/student/mech/thermodynamics" element={<VerificationComponent role="student"><Thermodynamics /></VerificationComponent>} />
          <Route path="/student/mech/thermodynamics/newpost" element={<VerificationComponent role="student"><ThermoPost /></VerificationComponent>} />
          <Route path="/student/mech/thermodynamics/editpost" element={<VerificationComponent role="student"><ThermodynamicsEdit /></VerificationComponent>} />
          <Route path="/student/mech/fluid-mechanics" element={<VerificationComponent role="student"><FluidMechanics /></VerificationComponent>} />
          <Route path="/student/mech/fluid-mechanics/newpost" element={<VerificationComponent role="student"><FluidMechPost /></VerificationComponent>} />
          <Route path="/student/mech/fluid-mechanics/editpost" element={<VerificationComponent role="student"><FluidMechEdit /></VerificationComponent>} />
          <Route path="/student/chem" element={<VerificationComponent role="student"><Chem /></VerificationComponent>} />
          <Route path="/student/chem/biochemical-engineering" element={<VerificationComponent role="student"><BiochemEng /></VerificationComponent>} />
          <Route path="/student/chem/biochemical-engineering/newpost" element={<VerificationComponent role="student"><BiochemPost /></VerificationComponent>} />
          <Route path="/student/chem/biochemical-engineering/editpost" element={<VerificationComponent role="student"><BiochemEdit /></VerificationComponent>} />
          <Route path="/student/chem/waste-management" element={<VerificationComponent role="student"><WasteManagement /></VerificationComponent>} />
          <Route path="/student/chem/waste-management/newpost" element={<VerificationComponent role="student"><WasteManagePost /></VerificationComponent>} />
          <Route path="/student/chem/waste-management/editpost" element={<VerificationComponent role="student"><WasteManageEdit /></VerificationComponent>} />
        </Routes>
      </VerificationProvider>
    </Router>
  );
};

export default App;
