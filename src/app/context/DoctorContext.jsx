'use client'
import { createContext, useContext, useEffect, useState } from "react";

export const DoctorContext = createContext(null)

export default DoctorContextProvider = ({children}) => {
    const [patients, setPatients] = useState(null)

    useEffect(() =>{
        const getPatients = async() => {
            const response = await fetch('/api/patientData', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json()

            setPatients(data.patients)
        }

        getPatients()
    }, [])


    return(
        <DoctorContext.Provider value={patients}>
            {children}
        </DoctorContext.Provider>
    )
}

export const useDoctorContext = () => {
    useContext(DoctorContext)
}