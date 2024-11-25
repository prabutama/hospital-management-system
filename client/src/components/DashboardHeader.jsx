import React from 'react';

export default function DashboardHeader({ user }) {
    return (
        <header className="p-4 shadow-sm rounded-lg border">
            <div className="flex flex-col items-start">
                {/* Dynamic greeting message based on role */}
                {user.role === "patient" && (
                    <>
                        <h1 className="text-2xl tracking-wider font-bold">Hallo {user.name},</h1>
                        <h1 className="text-2xl tracking-wider font-semibold">Tetap semangat menjalani hidup!</h1>
                    </>
                )}
                {user.role === "doctor" && (
                    <>
                        <h1 className="text-2xl tracking-wider font-bold">Halo Dr. {user.name},</h1>
                        <h1 className="text-2xl tracking-wider font-semibold">Terima kasih atas dedikasi Anda dalam merawat pasien!</h1>
                    </>
                )}
                {user.role === "staff" && (
                    <>
                        <h1 className="text-2xl tracking-wider font-bold">Halo staff {user.name},</h1>
                        <h1 className="text-2xl tracking-wider font-semibold">Kelola sistem dengan bijak!</h1>
                    </>
                )}
            </div>
        </header>
    );
}
