'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type ImageResponse = {
    image: string,
    filename: string,
    classname: string,
    accuracy: string
}
type ImageResponses = {
    data: ImageResponse[],
    msg:string
}
export default function Results({ searchParams: { patientName, patientAge, patientId } }: { searchParams: { patientName: string, patientAge: string, patientId: string } }) {
    const navigate = useRouter()
    const [data,setData]=useState<ImageResponses|null>(null)
    useEffect(() => {
        const newdata = JSON.parse(window.localStorage.getItem('data')!)
        console.log(newdata)
        if (!newdata) {
            navigate.replace('/')
        }
        else {
            setData(newdata)
        }
        return () => {
            window.localStorage.clear()
        }
    },[])
    return (
        <>
            {
                data && <>
                    <div className="flex gap-4 justify-center">
                        <p>Patient Name: {patientName}</p>
                        <p>Patient Age:{patientAge}</p>
                        <p>Patient ID:{patientId}</p>
                    </div>
                    <div className="flex flex-wrap gap-4 items-center  p-16">
                        {data?.data.map((e: ImageResponse, index: number) =>
                            <div key={index} className="flex flex-col gap-4 items-center">
                                <Image src={`data:image/jpeg;base64,${e.image}`} alt={`${e.filename}`} width={200} height={200} />
                                <p>Accuracy: {parseInt(e.accuracy).toFixed(2)}%</p>
                                <p>ClassName: {e.classname}</p>
                            </div>
                        )}
                    </div>
                </>
        }
        </>
    )
}