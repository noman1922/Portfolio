import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import DeferredComponents from "@/components/DeferredComponents";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <DeferredComponents />
      </main>
      <Footer />
    </>
  );
}
