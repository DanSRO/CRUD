import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styles from './EditVagas.module.scss';

interface Vaga {
    id: number;
    titulo: string;
    descricao: string;
    tipo: string;
    pausada: boolean;
}

export const EditVaga: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [vaga, setVaga] = useState<Vaga>({
        id: parseInt(id!),
        titulo: '',
        descricao: '',
        tipo: 'CLT', // valor padrão
        pausada: false,
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        const fetchVaga = async () => {
            try {
                const response = await fetch(`http://localhost:9000/api/vagas/${id}/edit`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: Vaga = await response.json();
                setVaga(data);
                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
                setLoading(false);
            }
        };

        fetchVaga();
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
        setVaga((prevVaga) => ({
            ...prevVaga,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`http://localhost:9000/api/vagas/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(vaga),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data: { message: string } = await response.json();
            setMessage(data.message);
            // Optionally redirect after successful update
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
            <h1>Edit Vaga</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Título:
                    <input
                        type="text"
                        name="titulo"
                        value={vaga.titulo}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Descrição:
                    <textarea
                        name="descricao"
                        value={vaga.descricao}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Tipo:
                    <select
                        name="tipo"
                        value={vaga.tipo}
                        onChange={handleInputChange}
                    >
                        <option value="CLT">CLT</option>
                        <option value="Pessoa Jurídica">Pessoa Jurídica</option>
                        <option value="Freelancer">Freelancer</option>
                    </select>
                </label>
                <label>
                    Pausada:
                    <input
                        type="checkbox"
                        name="pausada"
                        checked={vaga.pausada}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Salvar</button>
                {error && <p className={styles.error}>{error}</p>}
                <div className={styles.navigation}>
                    <Link to="/">Voltar para a Página Principal</Link>
                </div>
            </form>
        </div>
    );
};
