import styles from "./allCss.module.css";
import { useAppointedPatientAndDoctorContext } from "./store/AppointedPatient";
import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect} from "react"
import axios from "axios";
const uri = import.meta.env.VITE_API_URI

const Appointment = () => {

        const{
            nameInput,
            setNameInput,
            ageInput,
            setAgeInput,
            genderInput,
            setGenderInput,
            dateInput,
            setDateInput,
            phoneNumberInput,
            setPhoneNumberInput, 
            appointedDoctorInput,
            setAppointedDoctorInput,
            addAppointment, 
            editPatient,
            setDoctors,
            doctors,
            editPatientDetail,
            setEditPatientDetail,
        } = useAppointedPatientAndDoctorContext()

        const navigate = useNavigate()

    const { id } = useParams()
    console.log(uri)
        
        useEffect(() => {
            const fetch = async() => {
                try {
                    const response = await axios.get(`${uri}/api/patient/GetPatientId/${id}`)
                    setEditPatientDetail(response.data[0])
                } catch (error) {
                    console.log(error)
                }
            };
            fetch()
        },[id , setEditPatientDetail])

        useEffect( () => {
            const fetch = async() => {
                try {
                    const response = await axios.get(`${uri}/api/doctor/getDoctor/${id}`)
                    setDoctors(response.data)
                } catch (error) {
                    console.log(error)
                }
            };
            fetch()
            },[id , setDoctors])

        // useEffect(()=>{
        //     const fetch = async() => {
        //     try {
        //         const response = await axios.get(`${uri}/api/doctor/GetAllDoctors`)
        //         setDoctors(response.data)
        //     } catch (error) {
        //         console.log(error)
        //     }
        //     };
        //     fetch()
        // }, [])
    
        const formatDate = (dateString: string) => {
            if (!dateString) {
                return ''; // or return a default date string if needed
            }
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return ''; // Handle invalid date case
            }
            return date.toISOString().split('T')[0];
        };

        useEffect(() => {
            if(editPatientDetail != null){
                setNameInput(editPatientDetail.Name)
                setAgeInput(editPatientDetail.Age)
                setGenderInput(editPatientDetail.Gender)
                setDateInput(formatDate(editPatientDetail.Date)) 
                setPhoneNumberInput(editPatientDetail.PhoneNumber)
                setAppointedDoctorInput(editPatientDetail.AppointedDoctor)  
            }
        },[editPatientDetail])

        const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if(editPatientDetail != null){
                editPatient(editPatientDetail.Id)
                navigate('/')
            }else{
                addAppointment()
            }
        };

    return (
    <div className={styles.appointmentBox}>
        <h1 className={styles.appointmentBoxHeading}>Get Appointment</h1>
        <div>
            <form className={styles.appointmentForm} onSubmit={handleSubmit}>
                <div className={styles.appointmentInputs}>
                    <label className={styles.labels}>Name</label>
                    <input 
                        className={styles.inputsBox}
                        value={nameInput}
                        onChange={(e)=>{setNameInput(e.target.value)}}
                        type='text'
                        placeholder='Enter your  name...'
                    />
                </div>

                <div className={styles.appointmentInputs}>
                    <label className={styles.labels}>Age</label>
                    <input
                        className={styles.inputsBox}
                        value={ageInput}
                        onChange={(e)=>{setAgeInput(e.target.value)}}
                        type='tel'
                        placeholder='Enter your age...'
                    />        
                </div>

                <div>
                    <label className={styles.labels}>Gender</label>
                    <div className={styles.appointmentGenderInput}>
                        <div>
                            <input 
                                type='radio'
                                value="male"
                                name="gender"
                                checked={genderInput === "male"}
                                onChange={(e)=>{setGenderInput(e.target.value)}}
                            />
                            <label>Male</label>    
                        </div>
                        <div>
                            <input
                                type='radio'
                                value="female"
                                name="gender"
                                checked={genderInput === "female"}
                                onChange={(e)=>{setGenderInput(e.target.value)}}
                            />
                            <label>female</label>    
                        </div>
                        <div>
                            <input
                                type='radio'
                                value="others"
                                name="gender"
                                checked={genderInput === "others"}
                                onChange={(e)=>{setGenderInput(e.target.value)}}
                            />
                            <label>others</label>    
                        </div>
                    </div>
                </div>

                <div className={styles.appointmentInputs}>
                    <label className={styles.labels}>Appointment Date</label>
                    <input
                        className={styles.inputsBox}
                        value={dateInput}
                        onChange={(e)=>{setDateInput(e.target.value)}}
                        type='date'
                    />
                </div>

                <div className={styles.appointmentInputs}>
                    <label className={styles.labels}>Phone Number</label>
                    <input
                        className={styles.inputsBox}
                        value={phoneNumberInput}
                        onChange={(e)=>{setPhoneNumberInput(e.target.value)}}
                        type='tel'
                        placeholder='Add your Phone number...'
                    />
                </div>

                <div className={styles.appointmentInputs}>
                    <label className={styles.labels}>
                        Select Doctor: 
                    </label>
                    <select 
                        className={styles.inputsBox}
                        value={appointedDoctorInput}
                        onChange={(e) => setAppointedDoctorInput(e.target.value)}>
                        {Array.isArray(doctors) && doctors.map((doctor , index) => (
                            <option key={index}> Dr.{doctor.Name} - {doctor.Specialty}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.appointmentButtonDiv}>
                    {editPatientDetail != null ? (<button className={styles.appointmentButton}>Update</button>) : <button className={styles.appointmentButton}>Submit</button>}
                </div>
            </form>
        </div>
    </div>
    )
}

export default Appointment