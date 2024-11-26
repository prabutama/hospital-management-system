import { useState } from "react";
import { Outlet } from "react-router-dom";

export function Staff() {
    return (
        <div className="flex flex-col gap-4">
            <Outlet />
        </div>
    );
}
