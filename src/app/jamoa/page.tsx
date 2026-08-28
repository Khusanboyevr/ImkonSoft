import type { Metadata } from "next";

import { Navbar, Footer } from "@/components";
import TeamSection from "./team-section";

export const metadata: Metadata = {
  title: "Jamoa — ImkonSoft",
  description:
    "ImkonSoft jamoasi: dasturchilar, dizaynerlar va kiberxavfsizlik mutaxassislari bilan tanishing.",
};

export default function JamoaPage() {
  return (
    <>
      <Navbar />
      <TeamSection />
      <Footer />
    </>
  );
}
