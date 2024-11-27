import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import { Table } from '@/components/ui/table'; // Import komponen tabel dari shadcn

export default function User() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true); // Untuk menangani state loading

    useEffect(() => {
        // Mengambil data pengguna dan jumlah riwayat konsultasi
        const fetchData = async () => {
            try {
                // Gantilah URL dengan API endpoint yang sesuai
                const response = await axios.get('http://localhost:3000/api/consultation/user-count',
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                console.log(response.data);
                setUsers(response.data.users); // Misalnya response.data.users berisi data pengguna dan riwayat konsultasi
                setLoading(false); // Data telah diambil
            } catch (error) {
                console.error('Error fetching users:', error);
                setLoading(false); // Set loading ke false jika terjadi error
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="text-center text-lg font-semibold">Loading...</div>; // Menampilkan loading saat data sedang diambil
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-wider">Daftar Pasien</h2>
            <div className="overflow-x-auto shadow-md rounded-md">
                <Table className="min-w-full table-auto border-collapse bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nama Pengguna</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Jumlah Riwayat Konsultasi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.user_id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-700">{user.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{user.role}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{user.consultation_count}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}
