import { headers } from "next/headers"
import { NextResponse } from "next/server"

export async function POST (req) {
    try {
        const head = await headers()
        const user = JSON.parse(head.get('user'))
        const {authId} = await req.json()
        console.log('server',authId)
        if(!authId){
            return NextResponse.json({
                success: false,
                error: "No patientID provided"
            })
        }

        const clinicianWithPatients = await prisma.user.findUnique({
            where: {
                id: user.id
            },
            include: {
                patients: true
            }
        })

        console.log(clinicianWithPatients, "ASDF", authId)

        let patient = clinicianWithPatients.patients.find((patient) => {
            console.log(patient.authId === authId)
            return patient.authId === authId
        })

        console.log(patient)

        if(!patient){
            return NextResponse.json({
                success: false,
                error: "No patient exists"
            })
        }

        patient = {
            ...patient,
            stepCount: patient.stepCount.toString()
        }

        return NextResponse.json({
            success: true,
            patient
        })


    } catch (error) {
        console.error(error)
        return NextResponse.json({
            success: false,
            error: "Bugginz"
        })
    }

}