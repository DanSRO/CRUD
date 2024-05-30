import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Candidato } from '../Candidatos/CandidatosList';
import styles from './ShowCandidato.module.scss';

export const ShowCandidato: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [candidato, setCandidato] = useState<Candidato | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCandidato = async () => {
            try {
                const response = await fetch(`http://localhost:9000/api/candidatos/${id}`);
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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.container}>
            <h1>Detalhes da Candidato</h1>
            {candidato && (
                <div className={styles.details} >
                    <h2>{candidato.nome}</h2>
                    <p>{candidato.email}</p>
                    <p>{candidato.experiencia}</p>
                    <div className={styles.buttons}>                        
                        <button onClick={() => navigate('/candidatos')}>Voltar</button>
                        <button onClick={() => navigate('/')}>Voltar para a Página Principal</button>
                    </div>                    
                </div>
            )}
        </div>
    );
};
