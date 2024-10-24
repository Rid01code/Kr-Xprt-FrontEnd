import NavBar from "./Components/NavBar"
import { BrowserRouter , Routes , Route } from "react-router-dom"
import { AppointedPatientAndDoctorProvider } from "./Components/store/AppointedPatient"
import Appointment from "./Components/Appointment"
import Patients from "./Components/Patients"
import Home from "./Components/Home"
import Doctors from "./Components/Doctors"
import "./App.css"
import PatientsOnSpecificDate from "./Components/PatientsOnSpecificDate"
const App = () => {
  return (
    <div className="mainDiv">
      <div className="subDiv">
        <h1 className="Heading"> KARE XPERT - Hospital Management</h1>
        <BrowserRouter>
          <AppointedPatientAndDoctorProvider>
          <NavBar/>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/Appointment" element={<Appointment />} />
              <Route path="/update/:id" element={<Appointment/>}/>
              <Route path="/Doctors" element={<Doctors/>}/>
              <Route path="/Patients" element={<Patients />}/>
              <Route path="/UpdateDoctor/:id" element = {<Doctors/>}/>
              <Route path="/appointedDoctor/:id" element = {<Appointment/>}/>
              <Route path="/PatientsOnSpecificDate/:date" element ={<PatientsOnSpecificDate/>}/>
            </Routes>  
          </AppointedPatientAndDoctorProvider>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App