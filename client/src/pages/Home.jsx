import { Navbar } from '@/components/Navbar';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScanLine, ShieldPlus, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col bg-blue-50">
            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <header className="py-16 text-center bg-teal-400 text-white">
                <div className="container mx-auto px-6 md:px-12">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 font-poppins">
                        Solusi Kesehatan Anda di Ujung Jari
                    </h1>
                    <p className="text-lg md:text-xl mb-8">
                        Konsultasi dengan dokter terpercaya kapan saja, di mana saja. Hemat waktu dan dapatkan perawatan terbaik untuk kesehatan Anda.
                    </p>
                    <Link to={'/login'}>
                        <Button className="bg-white text-teal-400 border-teal-400 font-semibold hover:bg-opacity-80 transition-all duration-300">
                            Mulai Konsultasi
                        </Button>
                    </Link>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-16">
                <div className="container mx-auto px-6 md:px-12">
                    <h2 className="text-3xl font-bold text-center mb-12 text-teal-400">
                        Layanan Kami
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Konsultasi Online',
                                description:
                                    'Terhubung langsung dengan dokter melalui chat atau video call.',
                                icon: Stethoscope,
                            },
                            {
                                title: 'Rekam Medis Digital',
                                description: 'Akses riwayat kesehatan Anda dengan mudah dan aman.',
                                icon: ShieldPlus,
                            },
                            {
                                title: 'Diagnosis X-Ray',
                                description: 'Dapatkan diagnosa kesehatan Anda dengan cepat dan akurat.',
                                icon: ScanLine,
                            },
                        ].map((feature, index) => (
                            <Card
                                key={index}
                                className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
                            >
                                <CardHeader className="flex flex-col items-center gap-2 text-teal-400">
                                    <CardTitle className="text-center">
                                        {feature.icon && <feature.icon />}
                                    </CardTitle>
                                    <CardTitle className="text-gray-800">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-center text-gray-600">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call-to-Action Section */}
            <section className="py-16 text-center bg-teal-400 text-white">
                <div className="container mx-auto px-6 md:px-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Siap untuk Memulai?</h2>
                    <p className="text-lg md:text-xl mb-8">
                        Jangan tunda kesehatan Anda. Dapatkan layanan kesehatan terbaik sekarang juga.
                    </p>
                    <Link to="/register" className="">
                        <Button className="bg-white text-teal-400 border-teal-400 font-semibold hover:bg-opacity-80 transition-all duration-300">
                            Daftar Sekarang
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-6 text-center bg-gray-800 text-white">
                <div className="container mx-auto px-6 md:px-12">
                    <p>&copy; 2024 Telemedicine App. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
