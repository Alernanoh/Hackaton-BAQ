import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';
import FormData from 'form-data';

// Definir una interfaz para los errores de Axios
interface CustomError extends Error {
  response?: {
    data: any;
    status: number;
  };
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="donacion_firmada.pdf"',
    };

    const { pdfBase64, cedula, nombre, apellido } = await req.json();

    if (!pdfBase64) {
      return NextResponse.json({ error: 'Falta el PDF para firmar' }, { status: 400 });
    }
    if (typeof pdfBase64 !== 'string') {
      return NextResponse.json({ error: 'pdfBase64 debe ser una cadena' }, { status: 400 });
    }

    let cleanPdfBase64 = pdfBase64.trim();
    if (cleanPdfBase64.startsWith('data:application/pdf;base64,')) {
      cleanPdfBase64 = cleanPdfBase64.replace('data:application/pdf;base64,', '');
    }

    let pdfBuffer: Buffer;
    try {
      pdfBuffer = Buffer.from(cleanPdfBase64, 'base64');
    } catch (bufferError) {
      if (bufferError instanceof Error) {
        console.error('Error al convertir pdfBase64 a buffer:', bufferError.message);
        return NextResponse.json(
          { error: 'El PDF base64 no es válido', details: bufferError.message },
          { status: 400 }
        );
      } else {
        console.error('Error desconocido al convertir pdfBase64 a buffer:', bufferError);
        return NextResponse.json(
          { error: 'El PDF base64 no es válido', details: 'Error desconocido' },
          { status: 400 }
        );
      }
    }

    if (!pdfBuffer || pdfBuffer.length === 0) {
      console.error('El PDF recibido está vacío.');
      return NextResponse.json({ error: 'El PDF recibido está vacío.' }, { status: 400 });
    }

    // Convertir el Buffer a Blob para enviarlo a Uanataca
    const pdfBlob = new Blob([pdfBuffer], { type: 'application/pdf' });

    console.log('Datos del donador recibidos:', { cedula, nombre });

    // Obtener el token de Uanataca
    const tokenResponse = await axios.get('https://one-shot.developers.uanataca.com/api/v1/tokens');
    const token = Object.keys(tokenResponse.data.details)[0];
    console.log('Token de Uanataca:', token);

    // Crear solicitud de firma
    const formData = new FormData();
    formData.append('token', token);
    formData.append('profile', 'PFnubeQAFCiudadano');
    formData.append('given_name', nombre); // Usar el nombre del usuario
    formData.append('surname_1', apellido); // Usar el apellido del usuario
    formData.append('email', 'test-user@uanataca.com'); // Puedes usar un correo estático si no tienes uno
    formData.append('mobile_phone_number', '+34666123456'); // Número estático para pruebas

    const requestResponse = await axios.post(
      'https://one-shot.developers.uanataca.com/api/v1/request',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    const requestId = requestResponse.data.request_id;
    console.log('Solicitud de firma creada, ID:', requestId);

    // Subir el documento PDF
    const pdfFormData = new FormData();
    pdfFormData.append('file', pdfBlob, 'donacion.pdf');

    const uploadResponse = await axios.post(
      `https://one-shot.developers.uanataca.com/api/v1/documents/${requestId}`,
      pdfFormData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    const documentUid = uploadResponse.data.uid;
    console.log('Documento subido, UID:', documentUid);

    // Generar OTP
    const otpResponse = await axios.post(
      `https://one-shot.developers.uanataca.com/api/v1/otp/${requestId}`
    );
    console.log('OTP generado:', otpResponse.data);

    const otp = '000000'; // OTP ficticio para pruebas en sandbox

    // Firmar el documento
    const signResponse = await axios.post(
      `https://one-shot.developers.uanataca.com/api/v1/sign/${requestId}`,
      { secret: otp },
      { headers: { 'Content-Type': 'application/json' } }
    );
    console.log('Documento firmado:', signResponse.data);

    // Descargar el documento firmado
    try {
      const downloadResponse = await axios.get(
        `https://one-shot.developers.uanataca.com/api/v1/document/${requestId}/signed/${documentUid}`,
        { responseType: 'arraybuffer' }
      );

      const signedPdfBuffer = Buffer.from(downloadResponse.data);
      const signedPdfBlob = new Blob([signedPdfBuffer], { type: 'application/pdf' });

      return new NextResponse(signedPdfBlob, { status: 200, headers });
    } catch (error) {
      console.error('Error en el flujo de firma:', error);

      // Generar un PDF de prueba en caso de error
      const pruebaPdfBuffer = Buffer.from('Documento de prueba generado por error.', 'utf-8');
      const pruebaPdfBlob = new Blob([pruebaPdfBuffer], { type: 'application/pdf' });

      return new NextResponse(pruebaPdfBlob, { status: 200, headers });
    }
  } catch (error) {
    const typedError = error as AxiosError | CustomError;
    console.error('Error en POST /api/firmar:', {
      message: typedError.message,
      response: typedError.response?.data,
      status: typedError.response?.status,
    });
    return NextResponse.json(
      { error: 'Error al firmar el PDF', details: typedError.message },
      { status: 500 }
    );
  }
}
const pdfFormData = new FormData();
pdfFormData.append('file', pdfBuffer, { filename: 'donacion.pdf', contentType: 'application/pdf' });

const uploadResponse = await axios.post(
  `https://one-shot.developers.uanataca.com/api/v1/documents/${requestId}`,
  pdfFormData,
  { headers: pdfFormData.getHeaders() }
);
