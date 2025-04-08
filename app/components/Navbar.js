import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-purple-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-yellow-500">JeoparTrivia</h1>
        <ul className="flex gap-4">
          <li><Link href="/" className="hover:text-pink-500">Home</Link></li>
          <li><Link href="/categories" className="hover:text-pink-500">Categories</Link></li>
          <li><Link href="/profile" className="hover:text-pink-500">Profile</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
