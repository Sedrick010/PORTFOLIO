'use client';

import React from 'react';

export interface ToastMessage {
  id: number;
  text: string;
}

interface ToastProps {
  toasts: ToastMessage[];
}

export default function Toast({ toasts }: ToastProps) {
  return (
    <div id="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast show">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <span>{toast.text}</span>
        </div>
      ))}
    </div>
  );
}
