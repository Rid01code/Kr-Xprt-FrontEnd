import { useState , useEffect } from "react";
import { Link, useLocation } from "react-router-dom"
import styles from "./allCss.module.css"
import { SlCalender } from  "react-icons/sl";

import { useNavigate } from "react-router-dom";

const NavBar = () => {



  const [activeTab, setActiveTab] = useState("Home");
  const [tooltipVisible, setToolTipVisible] = useState<boolean>(false)
  const [calenderVisible, setCalenderVisible] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState<string>('');

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Home")
    } else if (location.pathname === "/Appointment") {
      setActiveTab("Appointment")
    } else if (location.pathname === "/Doctors") {
      setActiveTab("Doctors")
    } else if (location.pathname === "/Patients") {
      setActiveTab("Patients")
    } else if (/^\/update\/\d+$/.test(location.pathname)) {
      setActiveTab("Appointment")
    } else if (/^\/updateDoctor\/\d+$/.test(location.pathname)) {
      setActiveTab("Doctors")
    } else if (/^\/appointedDoctor\/\d+$/.test(location.pathname)) {
      setActiveTab("Appointment")
    } else if (location.pathname === "/patientsOnSpecificDatePatientDiv") {
      setActiveTab("Calendar")
    }
  }, [location])

  const handleMouseEnter = () => {
    setToolTipVisible(true)
  };

  const handleMouseLeave = () => {
    setToolTipVisible(false)
  }

  const showCalender = () => {
    setActiveTab("Calender")
    setCalenderVisible(true)
    setToolTipVisible(false)
  }

  useEffect(() => {
    if (selectedDate) {
      setCalenderVisible(false);
      navigate(`/PatientsOnSpecificDate/${selectedDate}`);
    }
  },[selectedDate]);
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className={styles.navBar}>
      <ul className={styles.calenderNavList}>
        <li
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`${activeTab === 'Calender' ? styles.activeListWordLink : styles.listWordLink}`}
          onClick={showCalender}>
          {calenderVisible === true ? (
            <input
              type="date"
              onChange={handleDateChange}
              className={styles.dateInput} />) : (<SlCalender color="white" />)}
        </li>
        {tooltipVisible && (<div className={styles.toolTip}><p className={styles.toolTipText}>Select date to see appointments</p></div>)}
      </ul>

      <ul className={styles.navList}>
        <Link
          to="/"
          className={`${activeTab === 'Home' ? styles.activeListWordLink : styles.listWordLink}`}
          onClick={() => { setActiveTab('Home') }}>
          <li className={styles.listWord}>Home</li>
        </Link>

        <Link
          to="/Appointment"
          className={`${activeTab === 'Appointment' ? styles.activeListWordLink : styles.listWordLink}`}
          onClick={() => { setActiveTab('Appointment') }}>
          <li className={styles.listWord}>Appointments</li>
        </Link>

        <Link
          to="/Doctors"
          className={`${activeTab === 'Doctors' ? styles.activeListWordLink : styles.listWordLink}`}
          onClick={() => { setActiveTab('Doctors') }}>
          <li className={styles.listWord}>Doctors</li>
        </Link>

        <Link
          to="/Patients"
          className={`${activeTab === 'Patients' ? styles.activeListWordLink : styles.listWordLink}`}
          onClick={() => { setActiveTab('Patients') }}>
          <li className={styles.listWord}>Patients</li>
        </Link>
      </ul>
    </div>
  )
};

export default NavBar