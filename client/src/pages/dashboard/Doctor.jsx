import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Layout } from "@/pages/dashboard/Layout";
import { useState } from "react";

export function Doctor() {
  const userRole = "doctor";

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedKeluhan, setSelectedKeluhan] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [diagnosis, setDiagnosis] = useState("");

  const data = [
    {
      id: 1,
      tanggalPengajuan: "15-02-2023",
      namaPasien: "John",
      keluhan: "Sakit Kepala",
      penyakit: "Migraine",
      deskripsiKeluhan:
        "Sakit kepala yang disertai dengan pusing, mual, dan sensitivitas terhadap cahaya.",
    },
    {
      id: 2,
      tanggalPengajuan: "16-02-2023",
      namaPasien: "Jane",
      keluhan: "Demam",
      penyakit: "Influenza",
      deskripsiKeluhan: "Demam tinggi, batuk, pilek, dan kelelahan.",
    },
    {
      id: 3,
      tanggalPengajuan: "17-02-2023",
      namaPasien: "Bob",
      keluhan: "Nyeri Sendi",
      penyakit: "Osteoartritis",
      deskripsiKeluhan:
        "Nyeri sendi yang disertai dengan kaku dan peningkatan kekakuan sendi.",
    },
  ];

  const columns = [
    { Header: "Tanggal Pengajuan", accessor: "tanggalPengajuan" },
    { Header: "Nama Pasien", accessor: "namaPasien" },
    { Header: "Keluhan", accessor: "keluhan" },
    { Header: "Penyakit", accessor: "penyakit" },
  ];

  const openDialog = (keluhan, namaPasien) => {
    setSelectedKeluhan(keluhan);
    setSelectedPatient(namaPasien);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedKeluhan("");
    setSelectedPatient("");
    setDiagnosis("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Diagnosis for ${selectedPatient}: ${diagnosis}`);
    closeDialog();
  };

  return (
    <Layout userRole={userRole} showNavbar={false} showSidebar={false}>
      <div className="flex flex-col gap-4">
        <div className="shadow-md rounded-xl overflow-hidden border border-gray-300">
          <table className="table-auto w-full" style={{ tableLayout: "fixed" }}>
            <thead className="bg-gray-100">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.accessor}
                    className="px-6 py-4 text-left border border-gray-200"
                  >
                    {column.Header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td colSpan={columns.length}>
                    <Accordion type="single" collapsible>
                      <AccordionItem value={String(row.id)}>
                        <AccordionTrigger
                          className="px-6 py-4 flex justify-between items-center w-full focus:outline-none"
                          style={{ border: "none" }}
                        >
                          {columns.map((column) => (
                            <span
                              key={`${row.id}-${column.accessor}`}
                              className={`text-left w-full`}
                              style={{
                                borderBottom: "none",
                                padding: "0.5rem 1rem",
                              }}
                            >
                              {column.accessor === "penyakit" ? (
                                <button
                                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                                  onClick={(e) => {
                                    e.stopPropagation(); // Cegah efek klik accordion
                                    openDialog(row.keluhan, row.namaPasien);
                                  }}
                                >
                                  Input Hasil Diagnosa
                                </button>
                              ) : (
                                row[column.accessor]
                              )}
                            </span>
                          ))}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="px-6 py-4 text-gray-700 flex">
                            <div className="w-1/2 pr-4">
                              {row.deskripsiKeluhan}
                            </div>
                            <div className="border-l border-gray-300 pl-4 w-1/2">
                              Tampilkan hasil diagnosa yang diinputkan dari
                              dialog form disini
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Dialog */}
        {isDialogOpen && (
          <div
            className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
            onClick={closeDialog}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-md w-96"
              onClick={(e) => e.stopPropagation()} // Prevent close on click inside dialog
            >
              <h2 className="text-xl font-bold mb-4">
                Diagnosis untuk {selectedPatient}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  {/* <label
                      htmlFor="diagnosis"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Keluhan:{" "}
                      <span className="font-bold">{selectedKeluhan}</span>
                    </label> */}
                  <textarea
                    id="diagnosis"
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Masukkan hasil diagnosis"
                    rows={4}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2"
                    onClick={closeDialog}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
