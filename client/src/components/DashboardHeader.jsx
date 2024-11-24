import React from 'react';

export default function DashboardHeader({ role }) {
    return (
        <header className="p-4 shadow-sm rounded-lg border">
            <div className="flex flex-col items-start">
                {/* Dynamic greeting message based on role */}
                {role === "patient" && (
                    <>
                        <h1 className="text-2xl tracking-wider font-bold">Hallo Raden Amba,</h1>
                        <h1 className="text-2xl tracking-wider font-semibold">Tetap semangat menjalani hidup!</h1>
                    </>
                )}
                {role === "doctor" && (
                    <>
                        <h1 className="text-2xl tracking-wider font-bold">Halo Dr. Raden Amba,</h1>
                        <h1 className="text-2xl tracking-wider font-semibold">Terima kasih atas dedikasi Anda dalam merawat pasien!</h1>
                    </>
                )}
                {role === "staff" && (
                    <>
                        <h1 className="text-2xl tracking-wider font-bold">Halo Admin,</h1>
                        <h1 className="text-2xl tracking-wider font-semibold">Kelola sistem dengan bijak!</h1>
                    </>
                )}
            </div>
        </header>
    );
}
