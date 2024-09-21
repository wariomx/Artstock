import Link from "next/link";

export default function NavBar() {
  return (
    <div className="flex items-end w-full bg-gray-100 ">
      <img className="h-16" src="logo" alt="Logo" />
      <p className="p-10 text-xl font-bold">ArtStock</p>
      <Link className="p-5 text-lg" href="./Dashboard">
        Dashboard
      </Link>
      <Link className="p-5 text-lg" href="./">
        Home
      </Link>
    </div>
  );
}
