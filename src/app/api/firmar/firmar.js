// pages/api/firmar.js
export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).end();
    return;
  }

  if (req.method === 'POST') {
    console.log('Datos para firmar:', req.body);
    // Aquí va tu lógica
    res.status(200).json({ mensaje: 'Firmado exitosamente' });
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
