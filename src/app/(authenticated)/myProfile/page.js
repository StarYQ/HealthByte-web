import { getUser } from '@/lib/auth';
import styles from './myProfile.module.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'My Profile - HealthByte',
};

export default async function MyProfile() {
  const user = await getUser();

  if (!user) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Navbar user={user} />
      <h1>My Profile</h1>
      <div className={styles.userInfo}>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Name:</strong> {user.name}</p>
      </div>
    </div>
  );
}
