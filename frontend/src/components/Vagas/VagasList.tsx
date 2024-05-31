import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./VagasList.module.scss"

export interface Vaga {
    id: number;
    titulo: string;
    descricao: string;
    tipo: 'CLT' | 'Pessoa Jurídica' | 'Freelancer';
    pausada: boolean;
}
export interface ApiError {
    message: string;
}

export function VagasList() {
    const [vagas, setVagas] = useState<Vaga[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        console.log(isLoggedIn);
    }, [isLoggedIn])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:9000/api/vagas');
                if (!response.ok) {
                    throw new Error('Network response was not work.');
                }
                const data = await response.json();
                setVagas(data.data);
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
            const response = await fetch(`http://localhost:9000/api/vagas/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setVagas(vagas.filter(vaga => vaga.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        }
    };

    const handleLogout = () => {
        console.log('oi')
        // try {
        // const response = await fetch('http://localhost:9000/api/logout', {
        //     method: 'post',
        // });
        // if (response.ok) {
        // Redirecionar para a página de login ou outra página
        localStorage.removeItem('authToken');
        // return <Link to={`/login`} />
        return window.location.href = 'http://localhost:3000/login';

        // }
        // else {
        // console.error('Erro ao fazer logout:', error);
        // }
        // } catch (err) {
        //     console.error('Erro ao fazer logout:', err);
        // }
    }

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        setIsLoggedIn(!!token);
    }, [])


    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    function protectedVacancyCreate(param: string, vaga?: Vaga) {
        if (param === "create" && isLoggedIn) {
            return <Link to="/create">Criar vaga</Link>;
        } else if (param === "edit" && isLoggedIn) {
            return <Link to={`/edit/${vaga?.id}`}>Editar</Link>;
        } else if (param === "delete" && isLoggedIn) {
            return handleDelete(vaga?.id as number);
        }  else {
            return alert('Precisa estar logado para acessar esse recurso!');
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Lista de Vagas</h1>
                <button type="button" onClick={() => protectedVacancyCreate("create")}>Criar vaga</button>
                {/* <Link to="/create">Criar vaga</Link> */}
                <Link to="/candidatos">Página de Candidatos</Link>
                {isLoggedIn ? (
                    <button type="button" onClick={handleLogout} className={styles.logoutButton}>Logout</button>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
            <ul>
                {vagas.map(vaga => (
                    <li key={vaga.id} className={styles.vagaItem}>
                        <h2>{vaga.titulo}</h2>
                        <p>{vaga.descricao}</p>
                        <div className={styles.buttonGroup}>
                            <button type="button" className={`${styles.button} ${styles.edit}`} onClick={() => protectedVacancyCreate("edit", vaga)}>Editar</button>
                            <Link to={`/show/${vaga.id}`} className={`${styles.button} ${styles.view}`}>Ver</Link>
                            {/* <button type="button" className={`${styles.button} ${styles.view}`} onClick={() => protectedVacancyCreate("show", vaga)}>Ver</button> */}
                            {/* <Link to={`/edit/${vaga.id}`} className={`${styles.button} ${styles.edit}`}>Editar</Link> */}
                            <button type="button" onClick={() => protectedVacancyCreate("delete", vaga)} className={`${styles.button} ${styles.delete}`}>Deletar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}