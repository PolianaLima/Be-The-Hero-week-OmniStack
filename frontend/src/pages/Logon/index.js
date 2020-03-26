import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import api from '../../Services/api'

import './style.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';



function Logon () {

    const [id, setid] = useState( '' );
    const history = useHistory();

    async function handleLogin ( e ) {
        e.preventDefault();
        try {
            const response = await api.post( 'sessions', { id } );

            localStorage.setItem( 'ongId', id );
            localStorage.setItem( 'ongName', response.data.name );

            history.push( './profile' )

        } catch ( err ) {
            alert( 'Falha no Logon' );
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Heroes" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>

                    <input
                        placeholder="Sua Id"
                        value={id}
                        onChange={e => setid( e.target.value )}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/Register">
                        <FiLogIn size={16} color="#e20401" />
                        Não Tenho cadastro
                    </Link>
                </form>

            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}

export default Logon;