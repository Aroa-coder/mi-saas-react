// ==========================================
// COMPONENTE: GeneradorWeb (BloomPage AI)
// ==========================================

import { useState } from 'react';

function GeneradorWeb() {

  // ==========================================
  // 🧠 ESTADOS
  // ==========================================

  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("idle"); 
  const [htmlGenerado, setHtmlGenerado] = useState("");
  const [error, setError] = useState("");

  // ==========================================
  // ⚙️ LÓGICA: GENERAR WEB CON GROQ
  // ==========================================

  const generarWeb = async (evento) => {
    evento.preventDefault();
    if (descripcion.trim() === "") return;

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
          "Authorization": `Bearer ${API_KEY}` 
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content: `
Eres BloomPage AI, un generador profesional de landing pages.
Devuelves SIEMPRE código HTML completo, limpio, bonito y moderno.
Usa colores suaves, tipografías elegantes y estructura profesional.
NO expliques nada. SOLO devuelve el HTML final.
              `
            },
            { role: "user", content: descripcion }
          ],
          temperature: 0.6
        })
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.error?.message || "Error generando la web");
      }

      const html = datos.choices[0].message.content;
      setHtmlGenerado(html);
      setEstado("listo");

    } catch (err) {
      setError(err.message);
      setEstado("error");
    }
  };

  // ==========================================
  // 🎨 VISUAL
  // ==========================================

  return (
    <main className="generador-web">

      <section className="panel-input">
        <h2>Genera tu landing con IA</h2>

        <form onSubmit={generarWeb}>
          <textarea
            placeholder="Describe tu negocio... Ej: Soy maquilladora y quiero una web elegante en tonos rosas."
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>

          <button type="submit">Generar Web</button>
        </form>

        {estado === "cargando" && <p>🌸 Generando tu web bonita...</p>}
        {error && <p className="error">❌ {error}</p>}
      </section>

      <section className="panel-preview">
        <h3>Vista previa</h3>

        {estado === "listo" && (
          <iframe
            className="preview-frame"
            srcDoc={htmlGenerado}
            title="Vista previa generada"
          ></iframe>
        )}

        {estado === "idle" && <p>Aún no has generado ninguna web.</p>}
      </section>

    </main>
  );
}

export default GeneradorWeb;
