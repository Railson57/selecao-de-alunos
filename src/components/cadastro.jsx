import { useState } from "react";

// Componente Cadastro do Candidato (Home)
function Cadastro({ onNavigate }) {
  const [possuiDeficiencia, setPossuiDeficiencia] = useState(false);
  const [cadastroFinalizado, setCadastroFinalizado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCadastroFinalizado(true);
    setTimeout(() => setCadastroFinalizado(false), 5000);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Cadastro de Candidato</h1>

        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Nome</label>
              <input type="text" required style={styles.input} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Sobrenome</label>
              <input type="text" required style={styles.input} />
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Telefone</label>
            <input type="tel" required style={styles.input} />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Origem Escolar</label>
            <select required style={styles.input}>
              <option value="">Selecione</option>
              <option value="publica">Rede Pública</option>
              <option value="privada">Rede Privada</option>
            </select>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Reside no território da escola?</label>
            <select required style={styles.input}>
              <option value="">Selecione</option>
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </select>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Possui alguma deficiência?</label>
            <select
              required
              style={styles.input}
              onChange={(e) => setPossuiDeficiencia(e.target.value === "sim")}
            >
              <option value="">Selecione</option>
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </select>
          </div>

          {possuiDeficiencia && (
            <div style={styles.field}>
              <label style={styles.label}>Qual deficiência?</label>
              <input type="text" required style={styles.input} />
            </div>
          )}

          <div style={styles.field}>
            <label style={styles.label}>Escolha o curso</label>
            <select required style={styles.input}>
              <option value="">Selecione</option>
              <option value="administracao">Administração</option>
              <option value="agropecuaria">Agropecuária</option>
              <option value="financas">Finanças</option>
              <option value="informatica">Informática</option>
              <option value="sistemas_energias_renovaveis">
                Sistemas de Energias Renováveis
              </option>
            </select>
          </div>

          <button type="submit" style={styles.button}>
            Finalizar Cadastro
          </button>
        </form>

        {cadastroFinalizado && (
          <div style={styles.successMessage}>✅ Cadastro finalizado com sucesso!</div>
        )}
      </div>
    </div>
  );
}

// Componente Notas do Aluno
function NotasAluno({ onNavigate }) {
  const [anoAtual, setAnoAtual] = useState(6);
  const [mensagemSucesso, setMensagemSucesso] = useState(false);
  const [notas, setNotas] = useState({
    ano6: { final: "", port: "", mat: "" },
    ano7: { final: "", port: "", mat: "" },
    ano8: { final: "", port: "", mat: "" },
    ano9: { final: "", port: "", mat: "" },
  });

  const formatarParaVirgula = (valor) => {
    if (valor === "") return "";
    const num = parseFloat(valor);
    if (isNaN(num)) return "";
    return num.toFixed(2).replace(".", ",");
  };

  const handleChange = (ano, campo, valorDigitado) => {
    let valor = valorDigitado.replace(/[^0-9,\.]/g, "");

    if (/^\d{2,3}$/.test(valor)) {
      valor = valor.slice(0, 1) + "." + valor.slice(1);
    }

    valor = valor.replace(",", ".");

    if (valor.match(/^\d+(\.\d{0,3})?$/)) {
      const valorNum = parseFloat(valor);
      if (valorNum <= 10 && !isNaN(valorNum)) {
        setNotas((prev) => ({
          ...prev,
          [`ano${ano}`]: {
            ...prev[`ano${ano}`],
            [campo]: valor,
          },
        }));
      }
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    const anoKey = `ano${anoAtual}`;
    const { final, port, mat } = notas[anoKey];
    if (!final || !port || !mat) {
      alert("Preencha todos os campos antes de continuar.");
      return;
    }

    if (anoAtual < 9) {
      setAnoAtual((prev) => prev + 1);
    } else {
      setMensagemSucesso(true);
      setAnoAtual(null);
      setTimeout(() => {
        setMensagemSucesso(false);
        setAnoAtual(6);
        setNotas({
          ano6: { final: "", port: "", mat: "" },
          ano7: { final: "", port: "", mat: "" },
          ano8: { final: "", port: "", mat: "" },
          ano9: { final: "", port: "", mat: "" },
        });
      }, 5000);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>Notas Escolares</h2>

        {mensagemSucesso ? (
          <div style={styles.successMessage}>✅ Notas enviadas com sucesso!</div>
        ) : (
          <form onSubmit={handleNext}>
            {[6, 7, 8, 9].map((ano) => {
              if (ano !== anoAtual) return null;
              const anoKey = `ano${ano}`;
              const nota = notas[anoKey];

              return (
                <div key={anoKey} style={styles.anoBox}>
                  <h3 style={styles.anoTitulo}>{ano}º Ano</h3>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Nota Final:</label>
                    <input
                      type="text"
                      inputMode="decimal"
                      style={styles.input}
                      required
                      value={formatarParaVirgula(nota.final)}
                      onChange={(e) => handleChange(ano, "final", e.target.value)}
                    />

                    <label style={styles.label}>Nota Final de Português:</label>
                    <input
                      type="text"
                      inputMode="decimal"
                      style={styles.input}
                      required
                      value={formatarParaVirgula(nota.port)}
                      onChange={(e) => handleChange(ano, "port", e.target.value)}
                    />

                    <label style={styles.label}>Nota Final de Matemática:</label>
                    <input
                      type="text"
                      inputMode="decimal"
                      style={styles.input}
                      required
                      value={formatarParaVirgula(nota.mat)}
                      onChange={(e) => handleChange(ano, "mat", e.target.value)}
                    />
                  </div>

                  <button type="submit" style={styles.submitButton}>
                    {anoAtual < 9 ? "Próximo Ano" : "Enviar Notas"}
                  </button>
                </div>
              );
            })}
          </form>
        )}
      </div>
    </div>
  );
}

// Componente principal da aplicação
export default function App() {
  const [pagina, setPagina] = useState("cadastro"); // cadastro ou notas

  return (
    <div>
      <nav style={styles.navbar}>
        <button
          onClick={() => setPagina("cadastro")}
          style={pagina === "cadastro" ? styles.navButtonActive : styles.navButton}
        >
          Cadastro
        </button>
        <button
          onClick={() => setPagina("notas")}
          style={pagina === "notas" ? styles.navButtonActive : styles.navButton}
        >
          Notas
        </button>
      </nav>

      {pagina === "cadastro" && <Cadastro />}
      {pagina === "notas" && <Notas />}
    </div>
  );
}

const styles = {
  navbar: {
    backgroundColor: "#2F4F4F",
    padding: "10px 20px",
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  },
  navButton: {
    backgroundColor: "#497961",
    border: "none",
    color: "#fff",
    padding: "10px 25px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "8px",
    transition: "background-color 0.3s",
  },
  navButtonActive: {
    backgroundColor: "#6FBF73",
    border: "none",
    color: "#fff",
    padding: "10px 25px",
    fontSize: "16px",
    cursor: "default",
    borderRadius: "8px",
  },
  page: {
    backgroundColor: "#2F4F4F",
    minHeight: "calc(100vh - 50px)",
    padding: "40px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
  },
  card: {
    backgroundColor: "#466d56",
    borderRadius: 12,
    padding: 30,
    width: "100%",
    maxWidth: 550,
    color: "#eee",
    boxShadow: "0 4px 12px rgb(0 0 0 / 0.3)",
  },
  container: {
    backgroundColor: "#466d56",
    borderRadius: 12,
    padding: 30,
    width: "100%",
    maxWidth: 450,
    color: "#eee",
    boxShadow: "0 4px 12px rgb(0 0 0 / 0.3)",
  },
  title: {
    textAlign: "center",
    marginBottom: 25,
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  row: {
    display: "flex",
    gap: 15,
    flexWrap: "wrap",
  },
  field: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    borderRadius: 8,
    padding: "7px 12px",
    border: "none",
    outline: "none",
    fontSize: 16,
    fontWeight: "600",
  },
  button: {
    marginTop: 15,
    padding: "14px",
    borderRadius: 8,
    border: "none",
    backgroundColor: "#6FBF73",
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    cursor: "pointer",
  },
  anoBox: {
    backgroundColor: "#386047",
    padding: 25,
    borderRadius: 10,
  },
  anoTitulo: {
    textAlign: "center",
    marginBottom: 20,
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    marginBottom: 20,
  },
  submitButton: {
    width: "100%",
    padding: 15,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    borderRadius: 8,
    border: "none",
    backgroundColor: "#6FBF73",
    cursor: "pointer",
  },
  successMessage: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#8FBC8F",
    borderRadius: 10,
    textAlign: "center",
    fontWeight: "bold",
    color: "#2F4F4F",
  },
};