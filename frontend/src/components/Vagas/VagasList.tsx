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
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Código antigo, funcional (comentários abaixo): Descomentar quando tiver em container, após as mudanças de css
                const response = await fetch('http://localhost:9000/api/vagas');
                    if(!response.ok){
                        throw new Error('Network response was not work.');
                    }
                        const data = await response.json();
                    setVagas(data.data); 
                //setVagas([{ id: 1, titulo: "macha", descricao: "oie", tipo: "CLT", pausada: false }]);
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


    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    return (

        <div className={styles.container}>            
            <div className={styles.header}>
                <h1>Lista de Vagas</h1>
                <Link to={`/create`}>Criar vaga</Link>
            </div>
            <ul>
                {vagas.map(vaga => (
                    <li key={vaga.id} className="styles.vagaItem">
                        <h2>{vaga.titulo}</h2>
                        <p>{vaga.descricao}</p>
                        <div className="styles.buttonGroup">                                
                            <Link to={`/edit/${vaga.id}`} className={`${styles.button} ${styles.edit}`}>Editar</Link>
                            <Link to={`/show/${vaga.id}`} className={`${styles.button} ${styles.view}`}>Ver</Link>
                            <button onClick={() => handleDelete(vaga.id)} className={`${styles.button} ${styles.delete}`}>Deletar</button>
                        </div>
                    </li>
                ))}
                <Link to={`/login`}>Login</Link>                            
            </ul>
        </div>        
    );
}