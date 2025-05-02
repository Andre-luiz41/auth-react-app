
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { API_URL } from '@/lib/constants';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Obtém o caminho de redirecionamento do estado de localização ou usa o painel como padrão
  const from = location.state?.from || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validação básica
    if (!email || !password) {
      setError('Por favor, digite email e senha');
      setLoading(false);
      return;
    }

    try {
      // Testar a conexão com o backend antes de tentar fazer login
      const testConnection = await fetch(`${API_URL}/api/health`, { 
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      }).catch(() => null);
      
      if (!testConnection) {
        console.error('Erro de conexão: API inacessível');
        setError(`Não foi possível conectar ao servidor (${API_URL}). Verifique se o backend está ativo.`);
        toast({
          title: "Erro de conexão",
          description: "Não foi possível conectar ao servidor. Verifique se o backend está acessível.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const success = await login(email, password);

      if (success) {
        navigate(from, { replace: true });
      } else {
        setError('Email ou senha inválidos');
      }
    } catch (err) {
      console.error('Erro de login:', err);
      setError('Erro de conexão ao servidor. Verifique se a API está acessível.');
      toast({
        title: "Erro de conexão",
        description: "Não foi possível conectar ao servidor. Verifique a URL da API.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Entrando...' : 'Entrar'}
      </Button>

      <div className="text-center text-sm">
        Não tem uma conta?{' '}
        <a href="/register" className="text-blue-600 hover:underline">
          Cadastre-se
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
