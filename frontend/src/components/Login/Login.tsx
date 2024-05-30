import { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Login.module.scss';

export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);    

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:9000/api/login', {
                // mode:'no-cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //'X-CSRF-TOKEN': getCsrfToken(),
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login bem-sucedido:', data);
                localStorage.setItem('authToken', data.token);
                window.location.href = 'http://localhost:3000/';
            } else {
                console.error('Erro no login');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };
    // const getCsrfToken = () => {
    //     const token = document.querySelector('meta[name="csrf-token"]');
    //     return token ? token.getAttribute('content') || '' : '';
    // };

    return (
        <div className={styles.container}>
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
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.navigation}>
                <Link to="/">Voltar para a Página Principal</Link>
                <Link to="/register">Não é cadastrado, registre-se aqui.</Link>            
            </div>
        </div>
    );
};
