import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-head">
      <h1 className="page-title">Nothing here</h1>
      <p className="page-desc">
        Took a wrong turn somewhere. <Link href="/">Head back to the favorites.</Link>
      </p>
    </div>
  );
}
