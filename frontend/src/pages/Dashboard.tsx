import { useState, useEffect } from 'react';
import AppLayout from '@/components/AppLayout';
import { useAuth } from '@/contexts/AuthContext';
import { API_URL } from '@/lib/constants';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface UserData {
  id: string;
  name: string;
  email: string;
}

const Dashboard = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/api/users`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error('Falha ao buscar usuários');
        }

        const data = await response.json();
        setUsers(data);
        setError(null);
      } catch (err) {
        console.error('Erro ao buscar usuários:', err);
        setError('Não foi possível carregar os usuários. Tente novamente mais tarde.');
        toast({
          title: "Erro ao carregar usuários",
          description: "Verifique sua conexão e tente novamente.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token, toast]);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Lista de Usuários</h1>
          <p className="text-gray-500 mt-1">Gerencie todos os usuários registrados</p>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <div className="animate-pulse text-xl font-semibold">Carregando usuários...</div>
          </div>
        ) : error ? (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6 text-red-700">{error}</CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <Card key={user.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{user.name}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">ID do Usuário: {user.id}</p>
                </CardContent>
              </Card>
            ))}

            {users.length === 0 && (
              <div className="col-span-full text-center py-10 text-gray-500">
                Nenhum usuário encontrado.
              </div>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Dashboard;
