
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LogIn, UserPlus } from "lucide-react";

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-100 to-slate-200">
      {/* Cabeçalho */}
      <header className="w-full p-4 flex justify-between items-center">
        <div className="font-bold text-xl">Gestão de Usuários</div>
        <div>
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button variant="outline">
                Painel
              </Button>
            </Link>
          ) : (
            <div className="flex gap-2">
              <Link to="/login">
                <Button variant="outline">Entrar</Button>
              </Link>
              <Link to="/register">
                <Button>Cadastrar</Button>
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Seção Principal */}
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Sistema de Gestão de Usuários</h1>
          <p className="text-xl text-gray-600 mb-8">
            Uma plataforma segura para autenticação e gerenciamento de usuários.
            Construída com React e .NET Core.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to={isAuthenticated ? "/dashboard" : "/register"}>
              <Button 
                size="lg"
                className="flex items-center gap-2 px-8"
              >
                <UserPlus className="h-5 w-5" />
                <span>{isAuthenticated ? "Ir para o Painel" : "Criar Conta"}</span>
              </Button>
            </Link>
            
            {!isAuthenticated && (
              <Link to="/login">
                <Button 
                  variant="outline"
                  size="lg"
                  className="flex items-center gap-2 px-8"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Entrar</span>
                </Button>
              </Link>
            )}
          </div>
          
          <p className="mt-10 text-sm text-gray-500">
            Autenticação segura com tokens JWT e rotas protegidas
          </p>
        </div>
      </div>
      
      {/* Rodapé */}
      <footer className="p-4 text-center text-sm text-gray-500">
        Sistema de Gestão de Usuários — Demo de Autenticação com React & .NET Core
      </footer>
    </div>
  );
};

export default Index;
