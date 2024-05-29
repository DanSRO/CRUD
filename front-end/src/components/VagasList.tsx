import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface Vaga{
    id:number;
    titulo:string;
    descricao:string;
    tipo: 'CLT' | 'Pessoa Jurídica' | 'Freelancer';
    pausada:boolean;
}
export interface ApiError{
    message:string;
}

export const VagasList:React.FC = () =>{
    const [vagas, setVagas] = useState<Vaga[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(()=>{
        const fetchData= async()=>{
            try{
                const response = await fetch('http://localhost:9000/api/vagas');
                if(!response.ok){
                    throw new Error('Network response was not work.');
                }
                    const data = await response.json();
                    setVagas(data.data);
                    setLoading(false);
                
            }catch(err){
                setError(err instanceof Error ? err.message: 'Unknown error.');
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


    if(loading){
        return <div>Loading...</div>;        
    }
    if(error){
        return <div>Error: {error}</div>;
    }
    return(
        
        <div>            
            <p>Bem-vindo ao sistema de vagas.</p>
            <div>
                <h1>Lista de Vagas</h1>
                <ul>
                    {vagas.map(vaga => (
                        <li key={vaga.id}>
                            <h2>{vaga.titulo}</h2>
                            <p>{vaga.descricao}</p>
                            <Link to={`/edit/${vaga.id}`}>Editar</Link>
                            <Link to={`/show/${vaga.id}`}>Ver</Link>
                            <Link to={`/create`}>Criar vaga</Link>
                            <Link to={`/login`}>Login</Link>
                            <Link to={`/register`}>Registrar vaga</Link>
                            <button onClick={() => handleDelete(vaga.id)}>Deletar</button>
                        </li>
                    ))}
                </ul>
            </div>                
        </div>        
    );
}