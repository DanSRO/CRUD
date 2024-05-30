import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./CandidatosList.module.scss"

export interface Candidato {
    id: number;
    nome: string;
    email: string;
    experiencia: string;    
}
export interface ApiError {
    message: string;
}

export function CandidatosList() {
    const [candidatos, setCandidatos] = useState<Candidato[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    useEffect(() => {
        const fetchData = async () => {
            try {                
                const response = await fetch('http://localhost:9000/api/candidatos');
                    if(!response.ok){
                        throw new Error('Network response was not work.');
                    }
                        const data = await response.json();
                    setCandidatos(data.data);                
                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error.');
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:9000/api/candidatos/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setCandidatos(candidatos.filter(candidato => candidato.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        }
    };

    const handleLogout = async () => {
        try{
            const response = await fetch('http://localhost:9000/api/logout',{
                method:'get',
            });
            if(response.ok) {
                // Redirecionar para a página de login ou outra página
                window.location.href = 'http://localhost:9000/api/login';
            }
            else {
                console.error('Erro ao fazer logout:', error);
            }
        }catch(err){
            console.error('Erro ao fazer logout:', err);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
      }, []);


    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    console.log(isLoggedIn);
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Lista de Candidatos</h1>
                <Link to={`/create`}>Criar candidato</Link>
                {isLoggedIn ? (
                    <button onClick={handleLogout}>Logout</button>
                    ) : (
                    <Link to={`/login`}>Login</Link>
                )}
            </div>
            <ul>
                {candidatos.map(candidato => (
                    <li key={candidato.id} className={styles.candidatoItem}>
                        <h2>{candidato.nome}</h2>
                        <p>{candidato.experiencia}</p>
                        <div className={styles.buttonGroup}>                                
                            <Link to={`/edit/${candidato.id}`} className={`${styles.button} ${styles.edit}`}>Editar</Link>
                            <Link to={`/show/${candidato.id}`} className={`${styles.button} ${styles.view}`}>Ver</Link>
                            <button onClick={() => handleDelete(candidato.id)} className={`${styles.button} ${styles.delete}`}>Deletar</button>
                        </div>
                        <div className={styles.navigation}>                            
                            <Link to="/">Voltar para a Página Principal</Link>                
                        </div>
                    </li>
                ))}                
            </ul>
        </div>        
    );
}