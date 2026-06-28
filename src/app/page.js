import Hero from "./Component/ui/HeroBanner";
import BannerSlider from "./Component/ui/BannerSlider";
import FeturedBooks from "./Component/ui/FeturedBooks";

export default function Page() {
  return (
    <main>
      <section>
        <Hero />
      </section>

      <section className="mt-10">
        <div className="mt-10 max-w-7xl mx-auto px-4">
          <BannerSlider />
        </div>
      </section>

      <section className="mt-10">
        <FeturedBooks></FeturedBooks>
      </section>
    </main>
  );
}