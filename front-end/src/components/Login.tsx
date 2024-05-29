import { useState } from 'react';

export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:9000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': getCsrfToken(),
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login bem-sucedido:', data);
                window.location.href = 'http://localhost:9000/api/vagas/dashboard';
            } else {
                console.error('Erro no login');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };
    const getCsrfToken = () => {
        const token = document.querySelector('meta[name="csrf-token"]');
        return token ? token.getAttribute('content') || '' : '';
    };

    return (
        <div>
            <h2>Login</h2>
            
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};
