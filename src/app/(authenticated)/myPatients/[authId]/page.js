import {getUser} from '@/lib/auth'
export default async function SpecificPatientPage({params}){

    const {authId} = await params;
    const user = await getUser()
    const data = await fetch(process.env.APPLICATION_URL + '/api/patientLookUp', {
        method: 'POST',
        headers: {
            user: JSON.stringify(user),
            'Content-type': 'application/json'
        },
        body: JSON.stringify({authId})
    })
    const res = await data.json()
    console.log(res)


    return (
         <div>
                
            <div>
            
            <strong>Name</strong>: {res.patient.name}
            </div>
            <div><strong>Step Count</strong>: {res.patient.stepCount}
            </div>

        </div> );
}
 