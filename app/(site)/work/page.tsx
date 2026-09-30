import { redirect } from "next/navigation";

// The favorites gallery is the home page; every project is in the sidebar.
export default function WorkPage() {
  redirect("/");
}
