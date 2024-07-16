import {Link} from "@inertiajs/react";

export default function Pagination({ links }) {
  return (
      <nav
        className="relative z-0 inline-flex -space-x-px justify-center"
        aria-label="Pagination">
        {links.map((link, index) => (
          <Link
            preserveScroll
            replace
            key={index}
            href={link.url || ""}
            dangerouslySetInnerHTML={{ __html: link.label }}
            className={`${link.active ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"} ${!link.url ? "cursor-not-allowed" : "hover:bg-gray-950"} relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
          />
        ))}
      </nav>
  );
}
