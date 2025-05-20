import { useState } from "react";

function NotasAluno() {
  const [anoAtual, setAnoAtual] = useState(6);
  const [mensagemSucesso, setMensagemSucesso] = useState(false);
  const [notas, setNotas] = useState({
    ano6: { final: "", port: "", mat: "" },
    ano7: { final: "", port: "", mat: "" },
    ano8: { final: "", port: "", mat: "" },
    ano9: { final: "", port: "", mat: "" },
  });

  const formatarParaVirgula = (valor) => {
    if (!valor) return "";
    const num = parseFloat(valor);
    return !isNaN(num) ? num.toFixed(2).replace(".", ",") : "";
  };

  const handleChange = (ano, campo, valorDigitado) => {
    // Permitir apenas números, vírgula ou ponto
    let valor = valorDigitado.replace(/[^0-9,\.]/g, "");

    // Substituir vírgula por ponto para fins de validação
    const valorNormalizado = valor.replace(",", ".");
    const numero = parseFloat(valorNormalizado);

    if (!isNaN(numero) && numero >= 0 && numero <= 10) {
      setNotas((prev) => ({
        ...prev,
        [`ano${ano}`]: {
          ...prev[`ano${ano}`],
          [campo]: valorNormalizado,
        },
      }));
    } else if (valor === "") {
      // Permitir limpar campo
      setNotas((prev) => ({
        ...prev,
        [`ano${ano}`]: {
          ...prev[`ano${ano}`],
          [campo]: "",
        },
      }));
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
      <style>
        {`
          input[type=number]::-webkit-outer-spin-button,
          input[type=number]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          input[type=number] {
            -moz-appearance: textfield;
          }
        `}
      </style>

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
                      value={nota.final.replace(".", ",")}
                      onChange={(e) => handleChange(ano, "final", e.target.value)}
                    />

                    <label style={styles.label}>Nota Final de Português:</label>
                    <input
                      type="text"
                      inputMode="decimal"
                      style={styles.input}
                      required
                      value={nota.port.replace(".", ",")}
                      onChange={(e) => handleChange(ano, "port", e.target.value)}
                    />

                    <label style={styles.label}>Nota Final de Matemática:</label>
                    <input
                      type="text"
                      inputMode="decimal"
                      style={styles.input}
                      required
                      value={nota.mat.replace(".", ",")}
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

const styles = {
  page: {
    height: "100vh",
    width: "100vw",
    background: "linear-gradient(to right, rgb(36, 56, 35), rgb(71, 165, 87))",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: "50px",
    fontFamily: "'Georgia', serif",
  },
  container: {
    backgroundColor: "#fff8f0",
    borderRadius: "30px",
    boxShadow: "0 10px 25px rgba(181, 196, 182, 0.9)",
    width: "90%",
    maxWidth: "700px",
    padding: "30px",
    boxSizing: "border-box",
    position: "relative",
  },
  title: {
    textAlign: "center",
    fontSize: "32px",
    color: "#5a3e1b",
    marginBottom: "30px",
  },
  anoBox: {
    marginBottom: "25px",
    padding: "20px",
    borderRadius: "20px",
    backgroundColor: "#fdfaf6",
    boxShadow: "inset 0 0 10px #f0e6d6",
  },
  anoTitulo: {
    fontSize: "20px",
    color: "#3f2917",
    marginBottom: "15px",
    fontWeight: "bold",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  label: {
    color: "#4b321b",
    fontWeight: "bold",
  },
  input: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #f5eede",
    backgroundColor: "#fdfaf6",
    color: "#3c2c1a",
    fontSize: "16px",
  },
  submitButton: {
    marginTop: "20px",
    width: "100%",
    backgroundColor: "#2F4F4F",
    color: "#fff",
    padding: "14px",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  successMessage: {
    marginTop: "50px",
    padding: "20px",
    backgroundColor: "#d4edda",
    color: "#155724",
    border: "2px solid #c3e6cb",
    borderRadius: "12px",
    fontSize: "20px",
    textAlign: "center",
    fontWeight: "bold",
  },
};

export default NotasAluno;
