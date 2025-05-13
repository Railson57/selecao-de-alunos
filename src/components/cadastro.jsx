import { useState } from "react";

function Cadastro() {
  const [isAluno, setIsAluno] = useState(false);

  // Alterna entre a parte de cadastro de usuário e aluno
  const toggleForm = () => {
    setIsAluno(!isAluno);
  };

  return (
    <>
      <style>{`
        body, html, #root {
          height: 100%;
          margin: 0;
          font-family: Arial, sans-serif;
        }

        .cadastro-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(135deg, #74ebd5, #9face6);
        }

        .cadastro-card {
          background-color: #ffffff;
          padding: 40px;
          width: 100%;
          max-width: 500px;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .cadastro-card h1 {
          text-align: center;
          color: #333;
          margin-bottom: 20px;
        }

        .cadastro-card input {
          width: 100%;
          padding: 12px;
          margin: 10px 0;
          border: 1px solid #ccc;
          border-radius: 8px;
          outline: none;
          transition: border-color 0.3s;
        }

        .cadastro-card input:focus {
          border-color: #1976d2;
        }

        .cadastro-card button {
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

        .cadastro-card button:hover {
          background-color: #125ea9;
        }

        .toggle-btn {
          text-align: center;
          margin-top: 20px;
          cursor: pointer;
          color: #1976d2;
          font-size: 16px;
        }
      `}</style>

      <div className="cadastro-wrapper">
        <div className="cadastro-card">
          <h1>{isAluno ? "Cadastro de Aluno" : "Cadastro de Usuário"}</h1>

          <form onSubmit={(e) => {
            e.preventDefault();
            alert(`${isAluno ? "Cadastro de Aluno" : "Cadastro de Usuário"} enviado!`);
          }}>
            <input type="text" name="nome" placeholder="Nome completo" required />
            <input type="email" name="email" placeholder="E-mail" required />
            <input type="password" name="senha" placeholder="Senha" required />

            {isAluno && (
              <>
                <input type="text" name="matricula" placeholder="Matrícula" required />
                <input type="text" name="curso" placeholder="Curso" required />
              </>
            )}

            <button type="submit">Cadastrar</button>
          </form>

          <div className="toggle-btn" onClick={toggleForm}>
            {isAluno ? "Cadastrar como Usuário?" : "Cadastrar como Aluno?"}
          </div>
        </div>
      </div>
    </>
  );
}

export default Cadastro;