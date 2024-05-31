import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Candidato } from '../Candidatos/CandidatosList';

import styles from './CreateCandidatos.module.scss';

export const CreateCandidato: React.FC = () => {
    const navigate = useNavigate();
    const [candidato, setCandidato] = useState<Omit<Candidato, 'id'>>({
        nome: '',
        email: '',
        experiencia: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string>('');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        setIsLoggedIn(!!token);
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
        setCandidato((prevCandidato) => ({
            ...prevCandidato,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:9000/api/candidatos/store', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(candidato),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data: { message: string } = await response.json();
            setMessage(data.message);
            navigate('/candidatos');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        }
    };

    return (
        <div className={styles.container}>
            {isLoggedIn ? (
            <>
            <h1>Create Candidato</h1>
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input
                        type="text"
                        name="nome"
                        value={candidato.nome}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={candidato.email}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Experiência:
                    <textarea
                        name="experiencia"
                        value={candidato.experiencia}
                        onChange={handleInputChange}
                    />
                </label>                
                <button type="submit">Salvar</button>
                {error && <p className={styles.error}>{error}</p>}
            <div className={styles.navigation}>
                <Link to="/candidatos">Voltar para a Candidatos</Link>
                <Link to="/">Voltar para a Página Principal</Link>                
            </div>
            </form>
            </>
            ) : (
                <h1>Necessário estar logado</h1>
            )}
        </div>
    );
};
