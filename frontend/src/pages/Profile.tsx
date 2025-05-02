
import AppLayout from '@/components/AppLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <AppLayout>
        <div className="text-center py-10">
          <div className="text-xl font-semibold">Dados do usuário não disponíveis</div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Meu Perfil</h1>
          <p className="text-gray-500 mt-1">Visualize suas informações de conta</p>
        </div>

        <Card className="max-w-md">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-slate-200">
                <User className="h-8 w-8" />
              </div>
              <div>
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mt-4">
              <div>
                <p className="text-sm font-medium text-gray-500">ID do Usuário</p>
                <p>{user.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Endereço de Email</p>
                <p>{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Nome</p>
                <p>{user.name}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Profile;
