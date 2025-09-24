import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        userRole: null,
        userName: null,
    });
    const [isLoading, setIsLoading] = useState(true); // Nuevo estado de carga

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const isExpired = decodedToken.exp ? decodedToken.exp * 1000 < Date.now() : false;
                if (isExpired) {
                    localStorage.removeItem('access_token');
                } else {
                    setAuth({
                        isAuthenticated: true,
                        userRole: decodedToken.role,
                        userName: decodedToken.nombre || 'Usuario',
                    });
                }
            } catch (error) {
                console.error('Token de acceso inválido:', error);
                localStorage.removeItem('access_token');
            }
        }
        setIsLoading(false); // La carga ha terminado, sin importar si hay token o no
    }, []);

    const login = (token) => {
        localStorage.setItem('access_token', token);
        const decodedToken = jwtDecode(token);
        setAuth({
            isAuthenticated: true,
            userRole: decodedToken.role,
            userName: decodedToken.nombre || 'Usuario',
        });
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        setAuth({
            isAuthenticated: false,
            userRole: null,
            userName: null,
        });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};