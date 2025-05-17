import React, { useState } from 'react';
import axios from 'axios';

const Login: React.FC = () => {
    const [correo_usuario, setCorreo]   = useState<string>('');
    const [password, setPassword]       = useState<string>('');
    const [error, setError]             = useState<string>('');

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // CAMBIAR DESPUÉS
            const response = await axios.post('http://127.0.0.1:8000/api/token/', {
                correo_usuario,
                password
            });
            
            const { access, refresh } = response.data;
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh)
            axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;


            alert('¡Login Exitoso!')

        } catch (err) {
                console.error(err);
                setError('Correo o contraseña incorrectos');
        }


    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <input 
                    type="email"
                    placeholder="Correo Electrónico"
                    value={correo_usuario}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                />
                <br />
                <input 
                    type="password"
                    placeholder='Contraseña'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default Login;