/* eslint-disable @next/next/no-img-element */
import AboutUs from '@/components/AboutUs';
import Artikel from '@/components/Artikel';
import Persyaratan from '@/components/Persyaratan';
import Slider from '@/components/Slider';
import WhayChooseUs from '@/components/WhayChooseUs';

export default function Home() {
   return (
      <div>
         <Slider />
         <WhayChooseUs />
         <AboutUs />
         <Persyaratan />
         <Artikel />
      </div>
   );
}
