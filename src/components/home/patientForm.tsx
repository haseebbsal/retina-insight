'use client';
import axiosInstance from "@/utils/axiosInstance";
import { FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { ImSpinner2 } from "react-icons/im";
import { useRouter } from "next/navigation";

export default function PatientForm() {
    const navigate=useRouter()
    const [imageFiles, setImageFile] = useState<null | FileList>()
    const [patientName, setPatientName] = useState<null | string>()
    const [patientAge, setPatientAge] = useState<null | string>()
    const [patientId, setPatientId] = useState<null | string>()

    const patientUploadMutation = useMutation((data: FormData) => axiosInstance.post('/uploadImagePatient', data), {
        onSuccess(data) {
            console.log('server response', data.data)
            localStorage.setItem('data',JSON.stringify(data.data))
            navigate.push(`/results?patientName=${patientName}&patientAge=${patientAge}&patientId=${patientId}`)
        },
    })
    function handleSubmit(e:FormEvent) {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        formData.append('files', imageFiles as any)
        console.log(formData, imageFiles)
        patientUploadMutation.mutate(formData)
        // setImageFile(null)
    }
    return (
        <>
            <form className="mt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex gap-2 ">
                    <div className="w-full"><label htmlFor="Fullname">Full Name:</label> <div><input type="text" onChange={(e) => {
                        setPatientName(e.target.value)
                    }} className="border border-1 border-black w-full" name="Fullname" id="Fullname" /></div></div>
                    <div className="w-full"><label htmlFor="age">Age:</label> <div><input onChange={(e) => {
                        setPatientAge(e.target.value)
                    }} type="number" name="age" className="border border-1 border-black w-full" id="age" /></div></div>
                    <div className="w-full"><label htmlFor="patientId">Patient ID:</label> <div><input type="text" onChange={(e) => {
                        setPatientId(e.target.value)
                    }} className="border border-1 border-black w-full" name="patientId" id="patientId" /></div></div>
                </div>
                <div>
                    <label htmlFor="image"> Upload Fundus Image:</label>
                    <div>
                        <input type="file" multiple onChange={(e) => {
                            const files = e.target.files as any as File[]
                            setImageFile(e.target.files)
                        }} name="image" id="image" />
                    </div>
                </div>
                <div className="flex justify-center gap-2">
                    <button type="submit" disabled={imageFiles == null} className="bg-blue-500 p-2 text-white">{patientUploadMutation.isLoading ? <ImSpinner2 className="animate-spin" />:'Test'}</button>
                    <button type="reset" className="bg-green-500 p-2 text-white">Reset</button>
                </div>
            </form>
        </>
    )
}