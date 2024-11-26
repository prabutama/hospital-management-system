import { Outlet } from "react-router-dom";

export function Doctor() {
  const userRole = "doctor";
  return (
    <>
      <Outlet />
    </>
  );
}
