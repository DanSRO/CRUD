import { useState } from "react";
import styles from './Register.module.scss';
import { Link } from "react-router-dom";

export const Register:React.FC = () =>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async()=>{
        try{
            const response = await fetch('http://localhost:9000/api/register', {
                mode: 'no-cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',                    
                },
                body: JSON.stringify({name, email, password}),
            });
            if(response.ok){
                window.location.href = './login';
            }else{
                setError('Erro ao cadastrar credenciais. Por favor, tente novamente.');
            }
        }catch(error){
            console.error('Erro ao cadastrar:', error);
            setError('Erro ao cadastrar credenciais. Por favor, tente novamente.');
        }        
    };

    return(
        <div className={styles.container}>
            <h2>Registrar</h2>
            <input 
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e)=>setName(e.target.value)}            
            />
            <input 
            type="email"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input 
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Registrar</button>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.navigation}>
                <Link to="/">Voltar para a Página Principal</Link>
                <Link to="/login">Login</Link>
            </div>
        </div>
    )
}