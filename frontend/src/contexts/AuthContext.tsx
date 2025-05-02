import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { API_URL, AUTH_TOKEN_KEY } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
}

// Define authentication context type
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Context instance
const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
  login: async () => false,
  register: async () => false,
  logout: () => {},
});

// AuthProvider
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Check for existing token on load
  useEffect(() => {
    const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
    
    if (storedToken) {
      setToken(storedToken);
      fetchUserProfile(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch user profile with token
  const fetchUserProfile = async (authToken: string) => {
    try {
      const response = await fetch(`${API_URL}/api/users/me`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        setToken(null);
        toast({
          title: "Erro de Autenticação",
          description: "Sua sessão expirou. Por favor, faça login novamente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erro ao buscar perfil do usuário:', error);
      localStorage.removeItem(AUTH_TOKEN_KEY);
      setToken(null);
      toast({
        title: "Erro de Conexão",
        description: "Não foi possível conectar ao servidor.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem(AUTH_TOKEN_KEY, data.token);
        setToken(data.token);
        await fetchUserProfile(data.token);
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo de volta!",
        });
        return true;
      } else {
        toast({
          title: "Erro de Login",
          description: data.message || "Email ou senha inválidos",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error('Erro de login:', error);
      toast({
        title: "Erro de Conexão",
        description: "Não foi possível conectar ao servidor. Tente novamente mais tarde.",
        variant: "destructive",
      });
      return false;
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Conta criada com sucesso",
          description: "Por favor, faça login com suas credenciais.",
        });
        return true;
      } else {
        toast({
          title: "Erro no Registro",
          description: data.message || "Não foi possível criar a conta. Tente novamente.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error('Erro de registro:', error);
      toast({
        title: "Erro de Conexão",
        description: "Não foi possível conectar ao servidor. Tente novamente mais tarde.",
        variant: "destructive",
      });
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setUser(null);
    setToken(null);
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export const useAuth = () => useContext(AuthContext);
