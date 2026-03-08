import Link from "next/link";

export default function FloatingButton() {
  return (
    <div className="fixed bottom-20 left-20 right-0 z-50 pointer-events-none">
      <div className="max-w-3xl w-full mx-auto flex justify-end px-4">
        <Link
          href="/community/posts"
          className="pointer-events-auto w-20 h-20 bg-blue-900 text-white rounded-full 
        flex items-center justify-center shadow-lg hover:bg-blue-800"
        >
          <p className="text-4xl leading-none relative top-[-2px] hover:scale-110 transition-transform">
            +
          </p>
        </Link>
      </div>
    </div>
  );
}
