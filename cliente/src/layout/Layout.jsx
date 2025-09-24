import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { Header } from '../components/Header';
import {
    HomeIcon,
    FolderIcon,
    DocumentIcon,
    DocumentTextIcon,
    BanknotesIcon,
    UserGroupIcon,
    PuzzlePieceIcon,
} from '@heroicons/react/24/outline';

export const Layout = ({ children }) => {
    const { auth, logout } = useContext(AuthContext); // Obtenemos `logout` también
    let navegacion;

    if (!auth.isAuthenticated) {
        return <section className="min-h-screen max-w-6xl mx-auto py-8">{children}</section>;
    }

    const { userRole } = auth;

    if (userRole === 'administrador') {
        navegacion = [
            {
                titulo: 'Clientes',
                icono: <PuzzlePieceIcon className="h-6 w-6 mr-2" />,
                ruta: '/clientes-administrador',
            },
            {
                titulo: 'Asistentes',
                icono: <UserGroupIcon className="h-6 w-6 mr-2" />,
                ruta: '/asistentes-administrador',
            },
            {
                titulo: 'Informes',
                icono: <DocumentTextIcon className="h-6 w-6 mr-2" />,
                ruta: '/informes-administrador',
            },
        ];
    }

    if (userRole === 'asistente') {
        navegacion = [
            {
                titulo: 'Seleccionar cliente',
                icono: <FolderIcon className="h-6 w-6 mr-2" />,
                ruta: '/seleccionar-cliente',
            },
            {
                titulo: 'Mis informes',
                icono: <DocumentIcon className="h-6 w-6 mr-2" />,
                ruta: '/informes-asistente',
            },
        ];
    }

    if (userRole === 'cliente') {
        navegacion = [
            {
                titulo: 'Tablero',
                icono: <HomeIcon className="h-6 w-6 mr-2" />,
                ruta: '/cliente',
            },
            {
                titulo: 'Mis informes',
                icono: <DocumentIcon className="h-6 w-6 mr-2" />,
                ruta: '/lista',
            },
            {
                titulo: 'Vista PDF',
                icono: <DocumentIcon className="h-6 w-6 mr-2" />,
                ruta: '/cliente-pdf',
            },
        ];
    }

    return (
        <main className="min-h-screen w-full font-sans antialiased relative bg-slate-100">
            <Header navegacion={navegacion} rol={userRole} onLogout={logout} />
            <section className="min-h-screen max-w-6xl mx-auto py-8">
                {children}
            </section>
        </main>
    );
};