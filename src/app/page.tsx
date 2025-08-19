import { Background } from "@/components/ui/background";
import { Footer } from "@/components/ui/footer";
import { Newsletter } from "@/components/ui/newsletter";

export default function Home() {
  return (
    <main className="p-inset h-[100dvh] w-full">
      <div className="relative h-full w-full">
        <Background src="/alt.mp4" placeholder="/alt-placeholder.png" />
        <Newsletter />
        <Footer />
      </div>
    </main>
  );
}
