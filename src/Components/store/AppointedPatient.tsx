import React, { createContext , useContext , useState , ReactNode, useEffect } from "react";
import axios from "axios";
const uri = import.meta.env.VITE_API_URI

interface AppointedPatientContextType{
    setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>
    appointments: Appointment[];
    addAppointment: () => void;
    deletePatient: (index: number) => void;
    editPatient: (index: number ) => void;
    nameInput: string;
    setNameInput: React.Dispatch<React.SetStateAction<string>>;
    ageInput: string;
    setAgeInput: React.Dispatch<React.SetStateAction<string>>;
    genderInput: string;
    setGenderInput: React.Dispatch<React.SetStateAction<string>>;
    dateInput: string;
    setDateInput: React.Dispatch<React.SetStateAction<string>>;
    phoneNumberInput: string;
    setPhoneNumberInput: React.Dispatch<React.SetStateAction<string>>;
    appointedDoctorInput: string;
    setAppointedDoctorInput:React.Dispatch<React.SetStateAction<string>>
    editPatientDetail: Appointment | null;
    setEditPatientDetail:  React.Dispatch<React.SetStateAction<Appointment | null>>;
    setPatientsOnSpecificDate: React.Dispatch<React.SetStateAction<Appointment[]>>;
    patientsOnSpecificDate: Appointment[];
}

interface Appointment{
    Id:  number,
    Name: string,
    Age: string,
    Gender: string,
    Date: string,
    PhoneNumber:string,
    AppointedDoctor: string
}

interface DoctorContextType{
    setDoctors: React.Dispatch<React.SetStateAction<Doctor[]>>
    doctors: Doctor[];
    addDoctor:() => void;
    deleteDoctor: (index: number) => void;
    editDoctor: (index: number) => void;
    doctorNameInput: string;
    setDoctorNameInput: React.Dispatch<React.SetStateAction<string>>;
    doctorPhoneNumberInput: string;
    setDoctorPhoneNumberInput: React.Dispatch<React.SetStateAction<string>>;
    doctorSpecialtyInput: string;
    setDoctorSpecialtyInput: React.Dispatch<React.SetStateAction<string>>
    editDoctorDetail: Doctor | null;
    setEditDoctorDetail: React.Dispatch<React.SetStateAction<Doctor | null>>
}

interface Doctor{
    Id: number,
    Name: string;
    Specialty: string;
    PhoneNumber: string
}

const AppointedPatientAndDoctorContext = createContext <AppointedPatientContextType & DoctorContextType | undefined>(undefined)

export const AppointedPatientAndDoctorProvider = ({children} : {children: ReactNode}) =>{
    const [appointments , setAppointments] = useState<Appointment[]>([])    
    const [nameInput , setNameInput]= useState("");
    const [ageInput , setAgeInput] = useState("");;
    const [genderInput , setGenderInput] = useState("")
    const [dateInput , setDateInput] =  useState("")
    const [phoneNumberInput , setPhoneNumberInput] = useState("");
    const [editPatientDetail , setEditPatientDetail] = useState<Appointment | null>(null)
    const [patientsOnSpecificDate , setPatientsOnSpecificDate] = useState<Appointment[]>([])

    const [doctors , setDoctors] = useState<Doctor[]>([])
    const [doctorNameInput , setDoctorNameInput] = useState('')
    const [doctorSpecialtyInput , setDoctorSpecialtyInput] = useState('General Medicine')
    const [doctorPhoneNumberInput , setDoctorPhoneNumberInput] = useState('')
    const [editDoctorDetail , setEditDoctorDetail] = useState<Doctor | null>(null)


    const [appointedDoctorInput, setAppointedDoctorInput] = useState("");

    useEffect(() => {
        if (doctors.length > 0) {
            setAppointedDoctorInput(`Dr. ${doctors[0].Name} - ${doctors[0].Specialty}`);
        }
    }, [setAppointedDoctorInput , doctors]);


    const addAppointment = () => {
        if (
            nameInput.trim() === '' ||
            ageInput.trim() === '' ||
            genderInput.trim() === '' ||
            dateInput.trim() === '' ||
            phoneNumberInput.trim() === '' ||
            appointedDoctorInput.trim() === ''
        ) {
            alert('Please fill all the details');
        } else {
            const today = new Date();
            today.setHours(0, 0, 0, 0); 
    
            const checkDate = new Date(dateInput);
            checkDate.setHours(0, 0, 0, 0); 
    
            if (isNaN(checkDate.getTime())) {
                alert('Invalid date format');
                setDateInput(''); 
            } else if (checkDate < today) {
                console.log(checkDate)
                console.log(today)
                alert('Date cannot be in the past');
                setDateInput(''); 
            } else {
                axios
                    .post(`${uri}/api/patient/CreatePatient`, {
                        nameInput,
                        ageInput,
                        genderInput,
                        dateInput,
                        phoneNumberInput,
                        appointedDoctorInput
                    })
                    .then((res) => {
                        const newAppointment = {
                            Id: res.data.Id,
                            Name: nameInput,
                            Age: ageInput,
                            Gender: genderInput,
                            Date: dateInput,
                            PhoneNumber: phoneNumberInput,
                            AppointedDoctor: appointedDoctorInput
                        };
                        setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
                        setNameInput('');
                        setAgeInput('');
                        setGenderInput('');
                        setDateInput('');
                        setPhoneNumberInput('');
                        setAppointedDoctorInput(`Dr. ${doctors[0].Name} - ${doctors[0].Specialty}`);
                    })
                    .catch((err) => console.log(err));
            }
        }
    };
    

    const deletePatient = (id: number) => {
        axios.delete(`${uri}/api/patient/DeletePatient/${id}`)
            .then(() => {
                setAppointments((prevAppointments) => prevAppointments.filter((appointment) => appointment.Id !== id));
            });
    };

    const editPatient = (id: number) => {
        if (
            nameInput.trim() === '' ||
            ageInput.trim() === '' ||
            genderInput.trim() === '' ||
            dateInput.trim() === '' ||
            phoneNumberInput.trim() === '' ||
            appointedDoctorInput.trim() === ''
        ) {
            alert('Please fill all the details');
        } else {
            const today = new Date();
            today.setHours(0, 0, 0, 0); 
    
            const checkDate = new Date(dateInput);
            checkDate.setHours(0, 0, 0, 0); 
    
            if (isNaN(checkDate.getTime())) {
                alert('Invalid date format');
                setDateInput(''); 
            } else if (checkDate < today) {
                alert('Date cannot be in the past');
                setDateInput(''); 
            } else {
                axios
                    .put(`${uri}/api/patient/UpdatePatient/${id}`, {
                        nameInput,
                        ageInput,
                        genderInput,
                        dateInput,
                        phoneNumberInput,
                        appointedDoctorInput
                    })
                    .then((response) => {
                        alert(`Data updated successfully`);
                        console.log(response)
                        setAppointments((prevAppointments) =>
                            prevAppointments.map((appointment) => {
                                if (appointment.Id === id) {
                                    return {
                                        Id: id,
                                        Name: nameInput,
                                        Age: ageInput,
                                        Gender: genderInput,
                                        Date: dateInput,
                                        PhoneNumber: phoneNumberInput,
                                        AppointedDoctor: appointedDoctorInput
                                    };
                                }
                                return appointment;
                            })
                        );
    
                        // Clear the form fields after successful update
                        setNameInput('');
                        setAgeInput('');
                        setGenderInput('');
                        setDateInput('');
                        setPhoneNumberInput('');
                        setAppointedDoctorInput('');
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    };
    



    const addDoctor = () => {
        axios.post(`${uri}/api/doctor/CreateDoctor` ,{doctorNameInput , doctorPhoneNumberInput , doctorSpecialtyInput})
        .then((res) => {
            const newDoctor = {
                Id: res.data.Id,
                Name: doctorNameInput,
                PhoneNumber: doctorPhoneNumberInput,
                Specialty: doctorSpecialtyInput
            }
            setDoctors((prevDoctors) => [...prevDoctors , newDoctor]);
            setDoctorNameInput("");
            setDoctorPhoneNumberInput("");
            setDoctorSpecialtyInput("");
        }).catch((err) => {
            console.log(err)
        })
    }

    const deleteDoctor = (id: number) =>{
        axios.delete(`${uri}/api/doctor/DeleteDoctor/${id}`)
        .then(() => {
            setDoctors((prevDoctor) =>  prevDoctor.filter((doctor) => doctor.Id !== id));

        })
    }

    const editDoctor = (id: number ) => {
        axios.put(`${uri}/api/doctor/UpdateDoctor/${id}` , {doctorNameInput , doctorPhoneNumberInput , doctorSpecialtyInput})
        .then((res) => {
            console.log(res)
            setDoctors((prevDoctors) => prevDoctors.map((doctor) => {
                if (doctor.Id === id) {
                    return {
                        Id: id,
                        Name: doctorNameInput,
                        PhoneNumber: doctorPhoneNumberInput,
                        Specialty: doctorSpecialtyInput
                    }
                }
                return doctor
            }))
            setDoctorNameInput("")
            setDoctorPhoneNumberInput("")
            setDoctorSpecialtyInput("")
        }).catch((error) => {
            console.log(error);
        })
    }

    return(
        <AppointedPatientAndDoctorContext.Provider
            value={{
                setAppointments,
                appointments,
                addAppointment,
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
                deletePatient,
                editPatient,
                editPatientDetail,
                setEditPatientDetail,
                patientsOnSpecificDate,
                setPatientsOnSpecificDate,

                setDoctors,
                doctors,
                addDoctor,
                doctorNameInput,
                setDoctorNameInput,
                doctorPhoneNumberInput,
                setDoctorPhoneNumberInput,
                doctorSpecialtyInput,
                setDoctorSpecialtyInput,
                deleteDoctor,
                editDoctor,
                editDoctorDetail,
                setEditDoctorDetail,
            }}
        >
            {children}
        </AppointedPatientAndDoctorContext.Provider> 
    )
};

export const useAppointedPatientAndDoctorContext = () => {
    const context = useContext(AppointedPatientAndDoctorContext);
    if (!context){
        throw new Error("useAppointmentContext must be used within an AppointmentProvider")
    }
    return context
}   