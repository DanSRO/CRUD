import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styles from './EditCandidatos.module.scss';

interface Candidato {
    id: number;
    nome: string;
    email: string;
    experiencia:string;
}
export const EditCandidato: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [candidato, setCandidato] = useState<Candidato>({
        id: parseInt(id!),
        nome: '',
        email: '',
        experiencia: '',
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        const fetchCandidato = async () => {
            try {
                const response = await fetch(`http://localhost:9000/api/candidatos/${id}/edit`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: Candidato = await response.json();
                setCandidato(data);
                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
                setLoading(false);
            }
        };

        fetchCandidato();
    }, [id]);

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
            const token = localStorage.getItem('authToken');
            const response = await fetch(`http://localhost:9000/api/candidatos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(candidato),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data: { message: string } = await response.json();
            setMessage(data.message);
            // 
            navigate('/');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.container}>
            <h1>Edit Candidato</h1>
            {message && <p>{message}</p>}
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
                    Experiencia:
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
        </div>
    );
};
