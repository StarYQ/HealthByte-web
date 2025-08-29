import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const head = await headers()
        const user = JSON.parse(head.get('user'))

        const clinicianWithPatients = await prisma.user.findUnique({
            where:{
                id: user.id
            },
            include: {
                patients: true
            }
        });

        const currPatients = clinicianWithPatients.patients.map((patient) =>( console.log("this is ",patient), {
            ...patient,
            stepCount: patient.stepCount.toString()

        }))



        return NextResponse.json({
            currPatients
        }, {status: 200})


    } catch (error) {
        console.error(error)
        return NextResponse.json({
            error: error.message
        })
    }
}