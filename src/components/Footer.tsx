import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>
        &copy; {currentYear} Sedrick James Camiguing. Built with React, Next.js &amp; bespoke CSS.
      </p>
    </footer>
  );
}
