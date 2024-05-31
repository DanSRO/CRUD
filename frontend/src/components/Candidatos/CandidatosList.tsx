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
        console.log(isLoggedIn);
    }, [isLoggedIn])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:9000/api/candidatos');
                if (!response.ok) {
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
        localStorage.removeItem('authToken');
        return window.location.href = 'http://localhost:3000/login';
    };

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        setIsLoggedIn(!!token);
    }, []);


    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    function protectedVacancyCreate(param: string, candidato?: Candidato) {
        if (param === "create" && isLoggedIn) {
            return <Link to="/candidatos/create">Criar candidato</Link>;
        } else if (param === "edit" && isLoggedIn) {
            return <Link to={`/candidatos/edit/${candidato?.id}`}>Editar</Link>;
        } else if (param === "delete" && isLoggedIn) {
            return handleDelete(candidato?.id as number);
        }  else {
            return alert('Precisa estar logado para acessar esse recurso!');
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Lista de Candidatos</h1>
                <Link to={`/candidatos/create`}>Criar candidato</Link>
                {isLoggedIn ? (
                    <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
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
                            <button type="button" className={`${styles.button} ${styles.edit}`} onClick={() => protectedVacancyCreate("edit", candidato)}>Editar</button>
                            <Link to={`/candidatos/show/${candidato.id}`} className={`${styles.button} ${styles.view}`}>Ver</Link>                            
                            <button type="button" onClick={() => protectedVacancyCreate("delete", candidato)} className={`${styles.button} ${styles.delete}`}>Deletar</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className={styles.navigation}>
                <Link to="/">Voltar para a Página Principal</Link>
            </div>
        </div>
    );
}