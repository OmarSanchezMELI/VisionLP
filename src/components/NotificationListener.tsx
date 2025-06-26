// src/components/NotificationListener.tsx
"use client";

import { useEffect, useRef } from 'react';
import { collection, query, where, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { NotificationToast } from './NotificationToast';

export function NotificationListener() {
  const { toast } = useToast();
  // Use a ref to store the timestamp to ensure it's stable across re-renders
  const mountTimeRef = useRef(Timestamp.now());

  useEffect(() => {
    // This query listens for notifications created at or after the component was mounted.
    // This prevents showing old notifications when the user loads or reloads the page.
    const q = query(
      collection(db, 'notifications'),
      where('createdAt', '>=', mountTimeRef.current)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        // We only care about newly added documents.
        if (change.type === 'added') {
          const newNotification = { id: change.doc.id, ...change.doc.data() };
          
          // Display the notification using a custom toast.
          toast({
            duration: 30000, // Show for 30 seconds
            description: <NotificationToast notification={newNotification} />,
            className: 'w-full max-w-lg p-2' // Custom class for styling
          });
        }
      });
    });

    // Clean up the listener when the component unmounts.
    return () => unsubscribe();
  }, [toast]);

  // This component doesn't render any visible UI itself.
  return null;
}
