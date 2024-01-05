// import axios from 'axios'

const getRutas = () => {
    return [
        {
            nombre: 'Procesos',
            ruta: '/dashboard/procesos',
            icon: 'BookFilled'
        },
        {
            nombre: 'Vacantes',
            ruta: '/dashboard/vacantes',
            icon: 'DiffFilled'
        },
        {
            nombre: 'Carreras',
            ruta: '/dashboard/carreras',
            icon: 'SnippetsFilled'
        },
        {
            nombre: 'Estudiantes',
            ruta: '/dashboard/estudiantes',
            icon: 'SnippetsFilled'
        },
        {
            nombre: 'Voucher',
            ruta: '/dashboard/vouchers',
            icon: 'SnippetsFilled'
        },
    ]
}

export {getRutas}