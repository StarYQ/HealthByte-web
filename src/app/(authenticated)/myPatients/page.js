import { getUser } from '@/lib/auth';
import styles from './myPatients.module.css';
import Navbar from '@/components/Navbar';
import PatientComponent from '@/components/PatientComponent';
export const metadata = {
  title: 'My Patients - HealthByte',
};

export default async function MyPatients() {
  const user = await getUser();

  if (!user) {
    return <div className={styles.container}>Loading...</div>;
  }
  const data = await fetch(process.env.APPLICATION_URL + '/api/getPatients', {
    method: "GET",
    headers:{
        user: JSON.stringify(user)
    } 
  })
  const res = await data.json()
  console.log(res)


  return (
    <div className={styles.container}>
      <Navbar user={user} />
      <h1>My Patients</h1>
      <p><i>Patient list placeholder</i></p>
      <PatientComponent patients={res.currPatients} ></PatientComponent>
    </div>
  );
}
