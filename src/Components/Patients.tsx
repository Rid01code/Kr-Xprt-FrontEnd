import { useAppointedPatientAndDoctorContext } from "./store/AppointedPatient"
import { Link } from "react-router-dom"
import axios from "axios"
import styles  from "./allCss.module.css"
import { useEffect } from "react";
const uri = import.meta.env.VITE_API_URI

const Patients = () => {

  const {setAppointments, appointments , deletePatient} = useAppointedPatientAndDoctorContext()

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await axios.get(`${uri}/api/patient/GetPatients`)
        setAppointments(response.data)
      } catch (error) {
        console.log(error)
      } 
    };
    fetchData()
  }, [setAppointments])  

  return (
    <div className={styles.patientBox}>
      <h1 className={styles.patientBoxHeading}>Patients List({appointments.length})</h1>  

      {appointments.length === 0 ?( 
        <p>No Patient Yet</p>
      ):(
        <ul className={styles.patientUL}>
          { Array.isArray(appointments) && appointments.map((appointment , index) => (
              <li key={index} className={styles.patientListBox}>
                <div>
                  <p className={styles.patientName}>{appointment.Name}</p>
                  <p>Age: {appointment.Age}</p>
                  <p>Gender: {appointment.Gender}</p>
                  <p>Appointment Date: {new Date(appointment.Date).toLocaleDateString()}</p>
                  <p>Phone Number: {appointment.PhoneNumber}</p>
                  <p>Appointed Doctor: {appointment.AppointedDoctor}</p>
                </div>
                <div className={styles.patientBoxButtonBox}>
                  <Link to={`/update/${appointment.Id}`}>
                    <button className={styles.patientEditButton}>Edit</button>
                  </Link>
                  <button 
                    className={styles.patientDeleteButton}
                    onClick={()=>deletePatient(appointment.Id)}>
                      Delete
                  </button>
                </div>
              </li>
          ))}
        </ul>
      )}

    </div>
  )
}

export default Patients