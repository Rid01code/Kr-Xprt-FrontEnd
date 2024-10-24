import { FormEvent, useEffect } from "react";
import { Link ,useParams , useNavigate } from "react-router-dom";
import styles from "./allCss.module.css"
import { useAppointedPatientAndDoctorContext } from "./store/AppointedPatient"
import axios from "axios";
const uri = import.meta.env.VITE_API_URI

const Doctors = () => {

  const {
    doctorNameInput,
    setDoctorNameInput,
    doctorPhoneNumberInput,
    setDoctorPhoneNumberInput,
    doctorSpecialtyInput,
    setDoctorSpecialtyInput,
    addDoctor,
    doctors,
    setDoctors,
    deleteDoctor,
    editDoctor,
    editDoctorDetail,
    setEditDoctorDetail,
  } = useAppointedPatientAndDoctorContext();

  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(()=>{
    const fetch = async() => {
      try {
        const response = await axios.get(`${uri}/api/doctor/GetAllDoctors`)
        setDoctors(response.data)
      } catch (error) {
        console.log(error)
      }
    };
    fetch()
  }, [])

  useEffect( () => {
    const fetch = async() => {
      try {
        const response = await axios.get(`${uri}/api/doctor/getDoctor/${id}`)
        setEditDoctorDetail(response.data[0])
      } catch (error) {
        console.log(error)
      }
    };
    fetch()
  },[id , setEditDoctorDetail])

  useEffect( () => {
    if(editDoctorDetail != null){
      setDoctorNameInput(editDoctorDetail.Name);
      setDoctorPhoneNumberInput(editDoctorDetail.PhoneNumber);
      setDoctorSpecialtyInput(editDoctorDetail.Specialty);
    }
  }, [editDoctorDetail])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(editDoctorDetail != null){
      editDoctor(editDoctorDetail.Id)
      navigate("/Doctors")
    }else{
      addDoctor()
    }
  } 

  return (
    <div className={styles.doctorsMainBox}>
      <div className={styles.doctorsBox}>
        <h1 className={styles.appointmentBoxHeading}>Register New Doctor</h1>
        <form 
          className={styles.appointmentForm} 
          onSubmit={handleSubmit}>
          <div className={styles.appointmentInputs}>
            <label className={styles.labels}>Doctor Name: </label>
            <input
              className={styles.inputsBox}
              type="text"
              placeholder="Enter Doctor's Name ..."
              value={doctorNameInput}
              onChange={(e)=> setDoctorNameInput(e.target.value)}/>
          </div>

          <div className={styles.appointmentInputs}>
            <label>Phone Number:  </label>
            <input
              className={styles.inputsBox}
              type="tel"
              value={doctorPhoneNumberInput}
              onChange={(e) => setDoctorPhoneNumberInput(e.target.value)}
              />

          </div>

          <div className={styles.appointmentInputs}>
            <label className={styles.labels}>Select Doctor</label>
            <select 
              className={styles.inputsBox}
              value={doctorSpecialtyInput}
              onChange={(e) => setDoctorSpecialtyInput(e.target.value)}>
              <option>General Medicine</option>
              <option>Pediatrician</option>
              <option>Gynecologist</option>
              <option>Neurologist</option>
              <option>Dermatologist</option>
              <option>Allergist</option>
            </select>
          </div>

          <div className={styles.appointmentButtonDiv}>
          {editDoctorDetail != null ? <button className={styles.appointmentButton}>Update</button> : <button className={styles.appointmentButton}>Submit</button>}
          </div>
        </form>
      </div>


      <div className={styles.patientBox}>
        <h1 className={styles.patientBoxHeading}>Doctors</h1>

        <ul className={styles.patientUL}>
          {Array.isArray(doctors) && doctors.map((doctor) => (
            <li key={doctor.Id} className={styles.patientListBox}>
              <div>
                <p className={styles.patientName}>Dr.{doctor.Name}</p>
                <p>Phone Number: {doctor.PhoneNumber}</p>
                <p>Specialty: {doctor.Specialty}</p>
              </div>

              <div className={styles.doctorButtonBox}>
                <button 
                  className={styles.patientDeleteButton}
                  onClick={()=> deleteDoctor(doctor.Id)}>
                  Delete
                </button>
                <Link to={`/updateDoctor/${doctor.Id}`}>
                  <button className={styles.patientEditButton}>Edit</button>
                </Link>
                <Link to={`/appointedDoctor/${doctor.Id}`}>
                  <button className={styles.getDoctorAppointmentButton}>Get Appointment</button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Doctors