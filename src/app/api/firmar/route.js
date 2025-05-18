// app/api/firmar/route.js
export async function POST(req) {
  try {
    const body = await req.json();
    console.log('Datos recibidos para firmar:', body);

    // Aquí va la lógica de firma
    return new Response(JSON.stringify({ mensaje: 'Firmado exitosamente' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al firmar' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
