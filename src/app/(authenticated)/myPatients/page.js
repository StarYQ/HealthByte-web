import { getUser } from '@/lib/auth';
import styles from './myPatients.module.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'My Patients - HealthByte',
};

export default async function MyPatients() {
  const user = await getUser();

  if (!user) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Navbar user={user} />
      <h1>My Patients</h1>
      <p><i>Patient list placeholder</i></p>
      {/* TODO: (FOR NEW MEMBERS) Create API route to access patient list and use it for the My Patients page*/}
    </div>
  );
}
