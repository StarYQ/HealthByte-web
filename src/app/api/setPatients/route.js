import { getUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { disconnect } from "process";

export async function GET(){
    try {
        const head = await headers()
        const user = JSON.parse(head.get('user'))
        
        // const patients = await prisma.patient.findMany()

        const clinicianWithPatients = await prisma.user.findUnique({
            where: {
              id: user.id
            },
            include: {
              patients: true
            }
          });

          const cliniciansNotWithPatients = await prisma.patient.findMany({
            where: {
                clinicians: {
                    none: {
                        id: user.id
                    }
                }
            }
          })

        // const allPatients = patients.map(patient => ({
        //         ...patient,
        //         stepCount: patient.stepCount.toString()
        // }))
        const currPatients = clinicianWithPatients.patients.map(patient => ({
            ...patient,
            stepCount: patient.stepCount.toString()
        }))
        
        const nonPatients = cliniciansNotWithPatients.map((patient) => ({
            ...patient,
            stepCount: patient.stepCount.toString()
        }))

        return NextResponse.json({
            currPatients, nonPatients
               
        }, {status:200})

    } catch (error) {
        console.error(error)
        return NextResponse.json({
            error: error.message
        })
    }
}

export async function POST(req){
    
    try {
        const {user, action, patientId} = await req.json()
        console.log("action, patientId", action, patientId)
        if(!user || !action || !patientId){
            throw new Error("Not all requirements met")
        }
        if(action == 'add'){
            const updatedClinician = await prisma.user.update({
                where:{
                    id: user.id,
                },
                data:{
                    patients: {
                        connect:{
                            authId: patientId
                        }
                    }
                }
            })

            console.log("Updated",updatedClinician)

            return NextResponse.json({updatedClinician})

        } else if(action == 'remove'){
            const updatedClinician = await prisma.user.update({
                where:{
                    id: user.id
                },
                data: {
                    patients:{
                        disconnect:{
                            authId: patientId
                        }
                    }
                }
            })
            console.log("Updated",updatedClinician)
            return NextResponse.json({updatedClinician})
        } else {
            throw new Error("Not Remove or Add")
        }

    } catch (error) {
        return NextResponse.json({error})
    }
}