import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Asegúrate de que la ruta sea correcta

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { auth } = useContext(AuthContext);

    // 1. Si el usuario no está autenticado, lo redirige al login.
    if (!auth.isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // 2. Si se especifican roles permitidos y el rol del usuario no está
    //    en la lista, lo redirige a la página de acceso denegado.
    if (allowedRoles && !allowedRoles.includes(auth.userRole)) {
        return <Navigate to="/acceso-denegado" replace />;
    }

    // 3. Si las verificaciones son exitosas, renderiza el componente hijo.
    return children;
};

export default ProtectedRoute;