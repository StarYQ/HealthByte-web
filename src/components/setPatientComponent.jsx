'use client'
import styles from './setPatientComponent.module.css'
import { useState } from 'react';

export const Card = ({ patient, onAdd, onRemove }) => {
    return (
        <div className={styles.card} >
            <h2>Patient Name: {patient.name || "No name provided"}</h2>
            <h2>Patient ID: {patient.authId}</h2>
            <h2>Step Count: {patient.stepCount}</h2>
            {onAdd && <button onClick={() => onAdd(patient.authId, 'add')}>Add Patient</button>}
            {onRemove && <button onClick={() => onRemove(patient.authId, 'remove')}>Remove Patient</button>}
        </div>
    );
};


const SetPatientComponent = ({user, currPatients,  nonPatients}) => {

    const [currentPatients, setCurrentPatients] = useState(currPatients);
    const [nonPatientList, setNonPatients] = useState(nonPatients);

    const handleClick = async(patientId, action) => {

        const body = {
            action,
            user,
            patientId
        }
        const res = await fetch('/api/setPatients', {
            method:"POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(body)
        })

        const response = await fetch('http://localhost:3000/api/setPatients', {
            method: "GET",
            headers:{
                user: JSON.stringify(user)
            } 
        })
    
        const {allPatients, currPatients, nonPatients} = await response.json()

        setCurrentPatients(currPatients)
        setNonPatients(nonPatients)
    

    }
    

    return ( <div className={styles.container} >

        {/* <div>
            <h1>All Patients</h1>
            {allPatients.map((patient) => {
                return <Card key={patient.authId} patient={patient} ></Card>
            })}
        </div> */}
        <div>
            <h1>Current Patients</h1>
            {currentPatients.map((patient) => {
                return <Card key={patient.authId} onRemove={handleClick} patient={patient} ></Card>
            }) }
        </div>
        <div>
            <h1>Non-Patients</h1>
            {nonPatientList.map((patient) => {
                return <Card key={patient.authId} onAdd={handleClick} patient={patient} ></Card>
            }) }
        </div>

    </div> );
}
 
export default SetPatientComponent;
        