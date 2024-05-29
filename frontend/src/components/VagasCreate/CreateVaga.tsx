import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Vaga } from '../Vagas/VagasList';

import styles from './CreateVagas.module.scss';

export const CreateVaga: React.FC = () => {
    const navigate = useNavigate();
    const [vaga, setVaga] = useState<Omit<Vaga, 'id'>>({
        titulo: '',
        descricao: '',
        tipo: 'CLT',
        pausada: false,
    });
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string>('');

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
            const response = await fetch('http://localhost:9000/api/vagas/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vaga),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data: { message: string } = await response.json();
            setMessage(data.message);
            navigate('/');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        }
    };

    return (
        <div className={styles.container}>
            <h1>Create Vaga</h1>
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
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
