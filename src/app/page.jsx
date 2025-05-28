import Image from "next/image";
import Container from "./components/Container";
import Navbar from "./components/Navbar";
import nextjs from "../../public/next.svg";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <Container>
      <Navbar />
      <div className="flex-grow text-center p-10">
        <h3 className="text-5xl font-bold">NextJS Dashboard</h3>
        <p className="text-gray-500">Become full stack developer with NextJS</p>
        <div className="flex justify-center my-10">
          <Image src={nextjs} alt="nextjs Logo" width={300} height={300} />
        </div>
      </div>
      <Footer />
    </Container>
  );
}
