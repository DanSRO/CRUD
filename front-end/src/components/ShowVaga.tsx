import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Vaga } from './VagasList';

export const ShowVaga: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [vaga, setVaga] = useState<Vaga | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVaga = async () => {
            try {
                const response = await fetch(`http://localhost:9000/api/vagas/${id}`);
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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Detalhes da Vaga</h1>
            {vaga && (
                <div>
                    <h2>{vaga.titulo}</h2>
                    <p>{vaga.descricao}</p>
                    <p>Tipo: {vaga.tipo}</p>
                    <p>Pausada: {vaga.pausada ? 'Sim' : 'Não'}</p>
                    <button onClick={() => navigate('/')}>Voltar</button>
                </div>
            )}
        </div>
    );
};
