import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Status from "../../components/Status/Status.jsx";
import Header from "../../components/Header/Header.jsx";

function Login() {
    const navigate = useNavigate();
    const [tgcadastro, settgcadastro] = useState(false);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loged, isLoged] = useState(false);
    const [statusInfo, setStatusInfo] = useState(null);

    const [cadastroEmail, setCadastroEmail] = useState('');
    const [cadastroUsername, setCadastroUsername] = useState('');
    const [cadastroPassword, setCadastroPassword] = useState('');

    const toggleTgCadastro = () => {
        settgcadastro((prev) => !prev);
    };

    if (localStorage.getItem('token')) {
        window.location.href = '/portalfuria2';
    }

    async function userLogin(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', loginEmail);
        formData.append('senha', loginPassword);

        try {
            const url = 'https://apicaioemns.42web.io/backend/api/user/userLogin.php';
            const proxy = 'https://corsproxy.io/?url=';
            const response = await fetch(proxy + encodeURIComponent(url), {
                method: 'POST',
                body: formData,
            });
            const result = await response.text();
            log(result);
            // if (result.status === 'success') {
            //     console.log('Login bem-sucedido!');
            //     localStorage.setItem('token', result.token);
            //     isLoged(true);
            //     navigate('/');
            // } else {
            //     setStatusInfo({
            //         status: result.status,
            //         mensagem: result.message,
            //         codigo: result.codigo,
            //     });
            // }
        } catch (error) {
            console.error('Erro ao processar o login:', error);
        }
    }

    async function userCadastro(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', cadastroEmail);
        formData.append('nome', cadastroUsername);
        formData.append('senha', cadastroPassword);

        try {
            const url = 'https://apicaioemns.42web.io/backend/api/user/userCadastro.php';
            const proxy = 'https://corsproxy.io/?url=';
            const response = await fetch(proxy + encodeURIComponent(url), {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            if (result.status === 'success') {
                console.log('Cadastro bem-sucedido!');
                localStorage.setItem('token', result.token);
                isLoged(true);
            } else {
                setStatusInfo({
                    status: result.status,
                    mensagem: result.message,
                    codigo: result.codigo,
                });
            }
        } catch (error) {
            console.error('Erro ao processar o cadastro:', error);
        }
    }

    return (
        <>
            {statusInfo && (
                <Status
                    status={statusInfo.status}
                    mensagem={statusInfo.mensagem}
                    codigo={statusInfo.codigo}
                />
            )}
            <Header />
            {/* Formulário de Login */}
            <div
                className={`m-auto mt-10 flex align-center flex-col gap-4 w-[420px] bg-gray-800 border-2 border-[var(--main-border-color)] rounded-lg p-4 transition-all duration-500 ease-in-out ${!tgcadastro ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 overflow-hidden'
                    }`}
            >
                <h1 className="font-extrabold text-4xl m-auto">Login</h1>
                <form onSubmit={userLogin}>
                    <label htmlFor="email" className="">Email:</label>
                    <input type="email" id="email" name="email" className="my-[20px] w-full h-10 rounded-md bg-gray-900 border-2 border-[var(--main-border-color)] p-2" required onChange={(e) => setLoginEmail(e.target.value)} />

                    <label htmlFor="password" className="mb-2">Senha:</label>
                    <input type="password" id="password" name="password" className="my-[20px] w-full h-10 rounded-md bg-gray-900 border-2 border-[var(--main-border-color)] p-2" required onChange={(e) => setLoginPassword(e.target.value)} />

                    <div className="flex justify-between my-10">
                        <button type="button" className="bg-purple-950 text-white font-bold py-2 px-4 rounded w-[45%]" onClick={toggleTgCadastro}>Cadastrar</button>
                        <button type="submit" className="bg-purple-950 text-white font-bold py-2 px-4 rounded w-[45%]">Login</button>
                    </div>
                </form>
                <p>Aviso: As informações como senha passam por criptografia para a sua segurança</p>
            </div>

            {/* Formulário de Cadastro */}
            <div className={`m-auto  flex align-center flex-col gap-4 w-[420px] bg-gray-800 border-2 
                border-[var(--main-border-color)] rounded-lg p-4 transition-all duration-500 ease-in-out 
                ${tgcadastro ? 'opacity-100 max-h-[800px]' : 'opacity-0 max-h-0 overflow-hidden'}`}
            >

                <h1 className="font-extrabold text-4xl m-auto">Cadastre-se</h1>
                <form onSubmit={userCadastro}>
                    <label htmlFor="email2" className="">Email:</label>
                    <input type="email" id="email2" name="email2" className="my-[20px] w-full h-10 rounded-md bg-gray-900 border-2 border-[var(--main-border-color)] p-2" required onChange={(e) => setCadastroEmail(e.target.value)} />

                    <label htmlFor="username" className="">Nome de Usuário:</label>
                    <input type="username" id="username" name="username" className="my-[20px] w-full h-10 rounded-md bg-gray-900 border-2 border-[var(--main-border-color)] p-2" required onChange={(e) => setCadastroUsername(e.target.value)} />

                    <label htmlFor="password2" className="mb-2">Senha:</label>
                    <input type="password" id="password2" name="password2" className="my-[20px] w-full h-10 rounded-md bg-gray-900 border-2 border-[var(--main-border-color)] p-2" required onChange={(e) => setCadastroPassword(e.target.value)} />

                    <div className="flex justify-between my-10">
                        <button type="button" className="bg-purple-950 text-white font-bold py-2 px-4 rounded w-[45%]" onClick={toggleTgCadastro}>Login</button>
                        <button type="submit" className="bg-purple-950 text-white font-bold py-2 px-4 rounded w-[45%]">Cadastrar</button>
                    </div>
                </form>
                <p>Aviso: As informações como senha passam por criptografia para a sua segurança</p>
            </div>
        </>
    );
}

export default Login;