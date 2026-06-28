import Hero from "./Component/ui/HeroBanner";
import BannerSlider from "./Component/ui/BannerSlider";
import FeturedBooks from "./Component/ui/FeturedBooks";
import Librarians from "./Component/ui/Librarians";
import Footer from "./Component/shared/Footer";

export default function Page() {
  return (
    <>
      <section>
        <Hero />
      </section>
      <main>
        <section className="py-10">
          <div className="mt-10 max-w-7xl mx-auto px-4">
            <BannerSlider />
          </div>
        </section>

        <section className="py-10">
          <FeturedBooks></FeturedBooks>
        </section>

        <section>
          <Librarians></Librarians>
        </section>
      </main>

      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
}
