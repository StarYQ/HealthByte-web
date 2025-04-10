import { useRouter } from 'next/navigation';
import './PatientBoxComponent.css';

const PatientBoxComponent = ({ patient }) => {
  const { name, stepCount } = patient;
  const router = useRouter()
  const handleClick = () => {
    router.push(`/myPatients/${patient.authId}`)
  }

  return (
    <div onClick={handleClick} className="patientContainer">
      <div className="patientName">{name}</div>
      <div className="patientSteps">
        <strong>Step Count: </strong>{stepCount}
      </div>
    </div>
  );
};

export default PatientBoxComponent;
