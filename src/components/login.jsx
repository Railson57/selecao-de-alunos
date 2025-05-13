import { useEffect } from "react";

function Login() {
  // Garante que o fundo pegue toda a tela — no estilo embutido
  useEffect(() => {
    document.body.style.margin = 0;
    document.body.style.height = "100vh";
    document.body.style.background = "linear-gradient(135deg, #74ebd5, #9face6)";
  }, []);

  return (
    <>
      <style>{`
        .login-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          width: 100vw;
        }

        .login-card {
          background-color: #ffffff;
          padding: 40px;
          width: 100%;
          max-width: 400px;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          transition: transform 0.2s;
        }

        .login-card:hover {
          transform: scale(1.02);
        }

        .login-card h1 {
          margin-bottom: 24px;
          text-align: center;
          color: #333;
        }

        .login-card input {
          width: 100%;
          padding: 12px;
          margin: 10px 0 20px 0;
          border: 1px solid #ccc;
          border-radius: 8px;
          outline: none;
          transition: border-color 0.3s;
        }

        .login-card input:focus {
          border-color: #1976d2;
        }

        .login-card button {
          width: 100%;
          padding: 12px;
          background-color: #1976d2;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .login-card button:hover {
          background-color: #125ea9;
        }
      `}</style>

      <div className="login-wrapper">
        <div className="login-card">
          <h1>Fazer Login</h1>
          <form onSubmit={(e) => {
            e.preventDefault();
            alert("Login enviado!");
          }}>
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="senha" placeholder="Senha" required />
            <button type="submit">Entrar</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;