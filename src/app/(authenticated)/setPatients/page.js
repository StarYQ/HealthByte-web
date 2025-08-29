import Navbar from "@/components/Navbar"
import SetPatientComponent from "@/components/setPatientComponent"
import { getUser } from "@/lib/auth"

export default async function setPatients(){
    
    const user = await getUser()

    const response = await fetch('http://localhost:3000/api/setPatients', {
        method: "GET",
        headers:{
            user: JSON.stringify(user)
        } 
    })

    const { currPatients, nonPatients} = await response.json()


 

    if(!user){
        return(
            <div>Loading...</div>
        )
    }
    
    return(
        <div>
            <Navbar user={user} ></Navbar>
            <h1>Set Patients</h1>

            <SetPatientComponent user={user}  currPatients={currPatients} nonPatients={nonPatients} ></SetPatientComponent>
    
        </div>
    )
}