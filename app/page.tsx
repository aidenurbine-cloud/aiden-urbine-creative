import Landing from "@/components/Landing";
import { landing } from "@/lib/projects";

export default function Home() {
  return <Landing slides={landing} />;
}
