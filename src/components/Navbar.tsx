



import { LogOut } from "lucide-react";

interface NavbarProps {
  user: any;
  setUser: (user: any) => void;
}

export default function Navbar({ user, setUser }: NavbarProps) {
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <header className="h-14 flex items-center justify-between  bg-green-200 shadow px-4">
<h1 className="text-4xl font-semibold text-emerald-500 border-b-2 border-emerald-500 inline-block">
  Events Planner
</h1>



      {user ? (
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-emerald-500 bg-emerald-100 px-3 py-1 rounded-md hover:bg-emerald-200"
        >
          <LogOut size={16} /> Logout
        </button>
      ) : (
        <span className="text-gray-500 text-sm">Not logged in</span>
      )}
    </header>
  );
}
