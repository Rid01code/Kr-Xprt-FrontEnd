import Appointment from "./Appointment"
import Patients from "./Patients"
import styles from "./allCss.module.css"

const Home = () => {
  return (
    <div className={styles.homeBox}>
        <Appointment/>
        <Patients/>
    </div>
  )
}

export default Home