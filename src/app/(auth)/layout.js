export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <body className="min-h-dvh w-full max-w-none m-0 p-0">{children}</body>
    </div>
  );
}
