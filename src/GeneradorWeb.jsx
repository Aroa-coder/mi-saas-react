import { useState } from "react";

function GeneradorWeb({ data }) {
  const [estado, setEstado] = useState("idle");
  const [htmlGenerado, setHtmlGenerado] = useState("");
  const [error, setError] = useState("");

  const generarWeb = async () => {
    if (!data) return;

    setEstado("cargando");
    setError("");
    setHtmlGenerado("");

    try {
      const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
      const URL = "https://api.groq.com/openai/v1/chat/completions";

      const respuesta = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            
{
  role: "system",
  content: `
Eres BloomPage AI, un diseñador web profesional tipo Wix / Webflow.

Tu objetivo es crear webs reales listas para usar.

REGLAS OBLIGATORIAS:
- Devuelve SOLO HTML
- NO explicaciones
- NO markdown
- NO \`\`\`

DISEÑO:
- moderno
- elegante
- limpio
- profesional
- responsive

ESTRUCTURA OBLIGATORIA:
- hero section
- servicios o info
- contacto
- footer

IMÁGENES:
- usa SOLO URLs reales de Unsplash
- NO uses rutas tipo /img o archivos locales

TIPOGRAFÍA:
- usa Google Fonts (Inter preferiblemente)

OBJETIVO FINAL:
La web debe parecer una web real de negocio lista para publicar.
`
},



            {
              role: "user",
              content: `
Tipo de negocio: ${data.tipo}
Estilo: ${data.estilo}

Nombre: ${data.nombre}
Descripción: ${data.descripcion}
Ubicación: ${data.ubicacion}
Teléfono: ${data.telefono}
Email: ${data.email}
              `,
            },
          ],
        }),
      });

      if (!respuesta.ok) {
        throw new Error("Error al llamar a la API");
      }

      const result = await respuesta.json();

      const html =
        result?.choices?.[0]?.message?.content ||
        "<h1>Error generando contenido</h1>";

      // 🔥 WRAPPER PRO
      const wrappedHtml = `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
  }

  body {
    background: #f6f7fb;
    color: #111827;
    line-height: 1.6;
  }

  img {
    max-width: 100%;
    border-radius: 12px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  section {
    padding: 80px 20px;
    max-width: 1100px;
    margin: auto;
  }

  h1 {
    font-size: 48px;
    font-weight: 700;
    letter-spacing: -0.5px;
  }

  h2 {
    font-size: 32px;
    margin-bottom: 20px;
  }

  p {
    color: #4b5563;
    font-size: 16px;
  }

  button {
    background: #111827;
    color: white;
    padding: 12px 18px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    transition: all 0.25s ease;
  }

  button:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.15);
  }

  .hero {
    text-align: center;
    padding: 120px 20px;
    background: linear-gradient(135deg, #111827, #374151);
    color: white;
    border-radius: 24px;
  }

  .hero h1 {
    color: white;
  }

  .hero p {
    color: #d1d5db;
    margin-top: 10px;
  }

  .card {
    background: white;
    padding: 24px;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    transition: 0.3s;
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 50px rgba(0,0,0,0.12);
  }
</style>
</head>

<body>
${html}
</body>
</html>
`;

      setHtmlGenerado(wrappedHtml);
      setEstado("completado");

    } catch (err) {
      console.error(err);
      setError(err.message);
      setEstado("error");
    }
  };

  return (
    <div style={{ width: "100%", height: "100vh", padding: "2rem" }}>
      <h1>BloomPage AI</h1>

      <button
        onClick={generarWeb}
        disabled={estado === "cargando"}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        {estado === "cargando" ? "Generando..." : "Generar Web"}
      </button>

      {error && <div style={{ color: "red" }}>{error}</div>}

      {htmlGenerado && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "#0f172a",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* TOP BAR */}
          <div
            style={{
              height: "60px",
              background: "#111827",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 20px",
              color: "white",
            }}
          >
            <h3 style={{ margin: 0 }}>🌐 Vista previa BloomPage</h3>

            <button
              onClick={() => setHtmlGenerado("")}
              style={{
                background: "white",
                color: "#111",
                border: "none",
                padding: "8px 14px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Cerrar
            </button>
          </div>

          {/* IFRAME FULLSCREEN */}
          <iframe
            title="preview"
            srcDoc={htmlGenerado}
            style={{
              width: "100%",
              height: "calc(100vh - 60px)",
              border: "none",
              background: "white",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default GeneradorWeb;