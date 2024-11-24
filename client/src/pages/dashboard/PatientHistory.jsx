import React from 'react'
import { Card } from "@/components/ui/card";

import { Table, TableHeader, TableRow, TableBody, TableCell, TableHead } from "@/components/ui/table";

export default function PatientHistory() {
    return (
        <Card className="shadow-md border">
            <h3 className="text-lg font-semibold p-4 border-b">Health History</h3>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-100">
                            <TableHead>Date</TableHead>
                            <TableHead>Doctor's Name</TableHead>
                            <TableHead>Complaint</TableHead>
                            <TableHead>Diagnosis Result</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {/* Replace these rows with dynamic data */}
                        <TableRow>
                            <TableCell>2024-11-20</TableCell>
                            <TableCell>Dr. Smith</TableCell>
                            <TableCell>Headache</TableCell>
                            <TableCell>Migraine</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>2024-11-18</TableCell>
                            <TableCell>Dr. Johnson</TableCell>
                            <TableCell>Back Pain</TableCell>
                            <TableCell>Muscle Strain</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>2024-11-15</TableCell>
                            <TableCell>Dr. Lee</TableCell>
                            <TableCell>Fever</TableCell>
                            <TableCell>Viral Infection</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>2024-11-15</TableCell>
                            <TableCell>Dr. Lee</TableCell>
                            <TableCell>Fever</TableCell>
                            <TableCell>Viral Infection</TableCell>
                        </TableRow>
                        {/* Add more rows dynamically as needed */}
                    </TableBody>
                </Table>
            </div>
        </Card>
    )
}
