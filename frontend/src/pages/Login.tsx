import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LoginForm from '@/components/LoginForm';

const Login = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
			<div className="w-full max-w-md">
				<Card className="shadow-lg">
					<CardHeader className="space-y-1">
						<CardTitle className="text-2xl font-bold text-center">Entrar</CardTitle>
						<CardDescription className="text-center">
							Digite seu email e senha para acessar sua conta
						</CardDescription>
					</CardHeader>
					<CardContent>
						<LoginForm />
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default Login;
