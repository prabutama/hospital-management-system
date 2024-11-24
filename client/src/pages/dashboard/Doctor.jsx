import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Layout } from "@/pages/dashboard/Layout";

export function Doctor() {
    const userRole = "doctor";
    const data = [
        {
            id: 1,
            tanggalPengajuan: "15-02-2023",
            namaPasien: "John",
            keluhan: "Sakit Kepala",
            penyakit: "Migraine",
        },
        {
            id: 2,
            tanggalPengajuan: "16-02-2023",
            namaPasien: "Jane",
            keluhan: "Demam",
            penyakit: "Influenza",
        },
        {
            id: 3,
            tanggalPengajuan: "17-02-2023",
            namaPasien: "Bob",
            keluhan: "Nyeri Sendi",
            penyakit: "Osteoartritis",
        },
    ];

    const columns = [
        {
            Header: "Tanggal Pengajuan",
            accessor: "tanggalPengajuan",
        },
        {
            Header: "Nama Pasien",
            accessor: "namaPasien",
        },
        {
            Header: "Keluhan",
            accessor: "keluhan",
        },
        {
            Header: "Penyakit",
            accessor: "penyakit",
        },
    ];

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
            <div className="shadow-md rounded-xl overflow-hidden border border-gray-300">
                <table
                    className="table-auto w-full"
                    style={{ tableLayout: "fixed" }}
                >
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
                                                        className="text-left w-full"
                                                        style={{
                                                            borderBottom: "none",
                                                            padding: "0.5rem 1rem",
                                                        }}
                                                    >
                                                        {row[column.accessor]}
                                                    </span>
                                                ))}
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="px-6 py-4 text-gray-700">
                                                    Lorem ipsum dolor sit amet consectetur adipisicing
                                                    elit. Tempora aliquid quos facere deserunt delectus
                                                    et atque excepturi quas id, laborum voluptas quod
                                                    non perferendis rem at, eos inventore amet odit!
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
        </div>
    );
}