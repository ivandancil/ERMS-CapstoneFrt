import { Navigate } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  children: ReactNode;
}

function PayrollRoute({ children }: Props) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (!token || role !== "payroll") {
      toast.error("Unauthorized Access. Payroll personnel only!");
      setIsAuthorized(false);
    } else {
      setIsAuthorized(true);
    }
  }, [token, role]);

  if (isAuthorized === false) {
    return <Navigate to="/" />;
  }

  if (isAuthorized === true) {
    return children;
  }

  return null; // Show nothing while checking
}

export default PayrollRoute;
