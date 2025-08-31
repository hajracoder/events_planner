import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
  user: any;
  setUser: (user: any) => void;
}

export default function Layout({ children, user, setUser }: LayoutProps) {
  return (
    <div className="flex h-screen">
      {/* Sidebar fix */}
      <Sidebar />

      {/* Right section: Navbar + Main Content */}
      <div className="flex flex-col flex-1">
        {/* Navbar upar fix */}
        <Navbar user={user} setUser={setUser} />

        {/* Content niche (sidebar ke right side me) */}
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
