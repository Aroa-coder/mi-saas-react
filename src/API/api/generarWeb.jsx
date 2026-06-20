export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método no permitido",
    });
  }

  try {
    const { descripcion, estilo } = req.body;

    return res.status(200).json({
      hero: {
        titulo: "Tu consulta psicológica",
        subtitulo:
          descripcion ||
          "Acompañamiento emocional profesional",
        imagenKeyword:
          "psychology office calm",
      },

      sobre: {
        titulo: "Quién soy",
        texto:
          `Diseño: ${estilo}`,
      },
    });

  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
}