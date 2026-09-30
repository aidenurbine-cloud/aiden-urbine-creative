import { redirect } from "next/navigation";

// Every project is listed in the sidebar, so /work just goes to the favorites.
export default function WorkPage() {
  redirect("/");
}
