import PatientForm from "@/components/home/patientForm";
export default function Home() {
  return (
    <>
      <div id="home">
        <h1 className="text-center text-lg font-bold">Retina Insight: Automated
          Disease Detection &
          Reporting Using Fundus
          Angiographs</h1>
      </div>
      <div className="px-16">
        <div>
          <h2 className="mt-16 text-lg text-blue-900">Patients Information</h2>
          <div className="bg-blue-500 w-[5%] h-[0.15rem]"></div>
        </div>
        <PatientForm/>
      </div>
    </>
  );
}
