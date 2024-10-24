import { useEffect } from 'react';
import axios from 'axios';
import  { useNavigate } from 'react-router-dom';
import { useAppointedPatientAndDoctorContext } from './store/AppointedPatient'
import styles from "./allCss.module.css"
import { useParams } from 'react-router-dom';
const uri = import.meta.env.VITE_API_URI

const PatientsOnSpecificDate = () => {

    const navigate = useNavigate()

    const {
        setPatientsOnSpecificDate,
        patientsOnSpecificDate,
        deleteDoctor
    } = useAppointedPatientAndDoctorContext()

    const { date } = useParams()

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const response = await axios.get(`${uri}/api/patient/GetPatientByRegistrationDate/${date}`)
                setPatientsOnSpecificDate(response.data)
            } catch (error) {
                console.log(error)
            }
        };
        fetchPatient()
    }, [setPatientsOnSpecificDate, date])


    return (
        <div className={styles.patientsOnSpecificDateDiv}>
            <h1 className={styles.patientsOnSpecificDateHeading}>Date- {date}</h1>
            <div className={styles.patientsOnSpecificDatePatientDiv}>
                    <ul className={styles.patientUL}>
                    {patientsOnSpecificDate.length === 0 ? (
                        <li>No patients found</li>
                        ) : (Array.isArray(patientsOnSpecificDate) ? patientsOnSpecificDate.map((patient, index) => (
                            <li key={index} className={styles.patientListBox}>
                                <div>
                                    <p className={styles.patientName}>{patient.Name}</p>
                                    <p>Age: {patient.Age}</p>
                                    <p>Gender: {patient.Gender}</p>
                                    <p>Appointment Date: {new Date(patient.Date).toLocaleDateString()}</p>
                                    <p>Phone Number: {patient.PhoneNumber}</p>
                                    <p>Appointed Doctor: {patient.AppointedDoctor}</p>
                                </div>

                                <div>
                                    <button
                                        className={styles.patientDeleteButton}
                                        onClick={() => deleteDoctor(patient.Id)}>
                                        Appointment Finished
                                    </button>
                                </div>
                            </li>)): <li className={styles.patientListBox}>No Appointment For Today. <button className={styles.patientEditButton} onClick={() => {navigate("/")}}> Create New Appointments</button></li>
                        )}
                    </ul>
            </div>
        </div>
    )
};

export default PatientsOnSpecificDate 