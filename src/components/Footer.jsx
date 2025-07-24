export default function Footer() {
  return (
    <footer className={`bg-white border-t shadow border-t-emerald-100 py-6 px-4 text-center text-gray-600 text-sm`}>
      <p>© {new Date().getFullYear()} Budgie. All rights reserved.</p>
    </footer>
  );
}