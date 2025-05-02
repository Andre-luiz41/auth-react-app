
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Users, User, LogOut } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 text-white p-4 hidden md:block">
        <div className="mb-8">
          <h1 className="text-xl font-bold">Gestão de Usuários</h1>
          <p className="text-slate-300 text-sm mt-1">Bem-vindo, {user?.name}</p>
        </div>

        <nav className="space-y-1">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded-md transition-colors ${
                isActive
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`
            }
          >
            <Users size={16} />
            <span>Lista de Usuários</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded-md transition-colors ${
                isActive
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`
            }
          >
            <User size={16} />
            <span>Meu Perfil</span>
          </NavLink>

          <Button
            variant="ghost"
            className="w-full flex items-center justify-start text-slate-300 hover:bg-slate-700 hover:text-white p-2"
            onClick={handleLogout}
          >
            <LogOut size={16} className="mr-2" />
            <span>Sair</span>
          </Button>
        </nav>
      </div>

      {/* Barra superior móvel */}
      <div className="md:hidden bg-slate-800 text-white p-4 w-full fixed top-0 z-10 flex items-center justify-between">
        <h1 className="text-xl font-bold">Gestão de Usuários</h1>
        <div className="flex gap-2">
          <NavLink to="/dashboard">
            <Button variant="ghost" size="sm">
              <Users size={16} />
            </Button>
          </NavLink>
          <NavLink to="/profile">
            <Button variant="ghost" size="sm">
              <User size={16} />
            </Button>
          </NavLink>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut size={16} />
          </Button>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 bg-slate-50">
        <div className="max-w-6xl mx-auto p-4 md:p-8 pt-20 md:pt-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
