import './globals.css';

export const metadata = {
  title: 'PASH JUICES — 100% Raw Cold-Pressed Juices, Smoothies & Elixirs',
  description: '100% Raw, Unpasteurized Cold-Pressed Fruit Juices, Smoothies & Herbal Elixirs with Zero Added Sugar. Pay via M-PESA Till 4809304.',
  icons: {
    icon: '/favicon.jpg',
    apple: '/favicon.jpg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[#E5E7EB] text-gray-900 flex flex-col font-sans antialiased selection:bg-[#D92626] selection:text-white">
        {children}
      </body>
    </html>
  );
}



