import { AddproductComponent } from './../../pages/account/addproduct/addproduct.component';
import { MenuItem } from './menu.model';

// Menu Administrador
export const MENU_ADMIN: MenuItem[] = [
    {
        id: 1,
        label: 'Cuenta',
        subItems: [
            {
                id: 1,
                label: 'Mi perfil',
                link: '/editar',
                parentId: 11
            },
            {
                id: 2,
                label: 'Roles',
                link: '/roles',
                parentId: 11
            },
            {
                id: 3,
                label: 'Usuarios',
                link: '/usuarios',
                parentId: 11
            }
        ]
    }
]

// Menu Docente
export const MENU_DOC: MenuItem[] = [
    {
        id: 1,
        label: 'Cuenta',
        subItems: [
            {
                id: 1,
                label: 'Dashboard',
                link: '/dashboard/docente',
                parentId: 11
            },
            {
                id: 2,
                label: 'Mi perfil',
                link: '/editar',
                parentId: 11
            },
            {
                id: 3,
                label: 'Categorias',
                link: '/categories',
                parentId: 11
            },
            {
                id: 4,
                label: 'Recursos',
                link: '/product',
                parentId: 11
            },
        ]
    }
]

// Menu Estudiante
export const MENU_EST: MenuItem[] = [
    {
        id: 1,
        label: 'Cuenta',
        subItems: [
            {
                id: 1,
                label: 'Mi perfil',
                link: '/editar',
                parentId: 11
            },
            {
                id: 2,
                label: 'Mis aprendizajes',
                link: '/product',
                parentId: 11
            },
            {
                id: 3,
                label: 'Mis rutas de aprendizaje',
                link: '/mis-rutas',
                parentId: 11
            }
        ]
    }
]
