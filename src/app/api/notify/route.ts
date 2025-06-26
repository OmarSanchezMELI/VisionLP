// src/app/api/notify/route.ts
import { NextResponse } from 'next/server';
import * as admin from 'firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';

// --- Initialize Firebase Admin SDK ---
// This requires a service account key. 
// Set the GOOGLE_APPLICATION_CREDENTIALS environment variable
// to the path of your service account key file.
// In Firebase Hosting / Cloud Functions environment, this is often handled automatically.
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
  } catch (e) {
    console.error('Firebase Admin Initialization Error', e);
  }
}

const db = admin.firestore();

// --- CORS Headers ---
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Allow any origin
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-control-Allow-Headers': 'Content-Type',
};

// --- OPTIONS handler for CORS preflight requests ---
export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 204, // No Content
    headers: corsHeaders,
  });
}

// --- POST handler to receive notifications ---
export async function POST(request: Request) {
  try {
    const notificationData = await request.json();

    // Basic validation
    if (!notificationData.date || !notificationData.metrics) {
      return NextResponse.json(
        { error: 'Datos incompletos. Se requieren "date" y "metrics".' }, 
        { status: 400, headers: corsHeaders }
      );
    }

    // Add notification to Firestore with a server timestamp
    const docRef = await db.collection('notifications').add({
      ...notificationData,
      createdAt: Timestamp.now(),
      read: false, // You can use this field later to mark notifications as read
    });

    return NextResponse.json(
      { success: true, id: docRef.id },
      { headers: corsHeaders }
    );

  } catch (error) {
    console.error('Error al agregar la notificación:', error);
    // Ensure CORS headers are sent even on error
    return NextResponse.json(
      { error: 'Error Interno del Servidor' },
      { status: 500, headers: corsHeaders }
    );
  }
}
