import { Navigate } from "react-router";

type Props = {
  children: React.ReactNode;
};

export default function AdminRoute({ children }: Props) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" replace />;
  if (role !== "admin") return <Navigate to="/tasks" replace />;

  return <>{children}</>;
}
