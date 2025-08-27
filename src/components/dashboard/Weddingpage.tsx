
import { Card, CardContent } from "../ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Images
import hall1 from "../../assets/hall6.jpeg";
import hall5 from "../../assets/hall5.jpg";
import hall6 from "../../assets/hall6.jpg";
import hall7 from "../../assets/hall7.jpg";
import hall8 from "../../assets/hall8.webp";
import hall9 from "../../assets/hall9.jpg";
import marr1 from "../../assets/marr1.jpeg";
import mar2 from "../../assets/mar2.jpg";
import marr3 from "../../assets/marr3.jpg";
import marr4 from "../../assets/marr4.jpg";
import marr5 from "../../assets/marr4.jpeg";
import marr11 from "../../assets/marr11.jpg";
import marr12 from "../../assets/marr12.jpg";
import marrhall from "../../assets/marrhall.jpg";
import marrhall3 from "../../assets/marrhall.jpg";
import a from "../../assets/mphtograph.webp";
import b from "../../assets/photo2.jpg";
import c from "../../assets/photo3.jpg";
import d from "../../assets/photo5.jpg";
import e from "../../assets/photo6.jpg";
import f from "../../assets/photographer11.jpg";
import g from "../../assets/menu.jpg";
import k from "../../assets/menu2.jpg";
import l from "../../assets/menu3.jpg";
import m from "../../assets/menu4.jpg";
import n from "../../assets/menu5.jpg";
import o from "../../assets/menu6.jpg";
import p from "../../assets/menu7.jpg";
import q from "../../assets/makeup1.jpg";
import r from "../../assets/makeup2.jpg";
import s from "../../assets/makeup4.jpg";
import t from "../../assets/makeup6.jpg";
import u from "../../assets/makeup7.jpg";
import v from "../../assets/makeup8.jpg";
import w from "../../assets/makeup9.jpg";
import z from "../../assets/wedding1.jpg";

interface PageProps {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

export default function WeddingPage({ setActivePage }: PageProps) {


  const gallery = {
    Hall: [hall6, hall7, hall8, hall9, marr1, mar2, marr11, marrhall3, hall1, hall5],
    Photographer: [a, b, c, d, e, f],
    Menu: [g, k, l, m, n, o, p],
    Makeup: [q, r, s, t, u, v, w],
    Stage: [marr3, marr4, marr5, marrhall, marr12],
  };

  const modernTitles: { [key: string]: string } = {
    Hall: "Venue & Decor",
    Photographer: "Captured Moments",
    Menu: "Culinary Delights",
    Makeup: "Beauty & Glam",
    Stage: "Grand Stage",
  };

  return (
    <div className="p-6 space-y-8 relative">
      {/* Top-right Close Button */}
      <button
        onClick={() => setActivePage("Dashboard")}
        className="fixed top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-400 text-white text-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 z-50"
      >
        ✖
      </button>

      {/* Overview Card */}
      <Card className="relative overflow-hidden rounded-2xl shadow-2xl">
        <div className="absolute inset-0">
          <img src={z} alt="Wedding Hall" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <CardContent className="relative z-10 flex flex-col justify-center items-center text-center p-4 sm:p-6 md:p-10 min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white flex items-center gap-2">
            💍 Wedding Overview
          </h2>
          <p className="mt-2 text-lg sm:text-xl md:text-2xl font-semibold text-white italic max-w-xl">
            “Two souls, one heart, and a lifetime of memories.”
          </p>
        </CardContent>
      </Card>

      {/* Gallery Sections */}
      {Object.entries(gallery).map(([category, images], idx) => (
        <Card key={idx} className="shadow-lg rounded-xl overflow-hidden">
          <CardContent className="p-6">
            <h2 className="text-4xl font-bold text-pink-400 mb-6 flex items-center gap-2">
              📸 {modernTitles[category] || category}
            </h2>

            <Swiper
              modules={[Navigation, Autoplay]}
              navigation
              autoplay={{ delay: 3000 }}
              loop
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 15 },
                1024: { slidesPerView: 3, spaceBetween: 20 },
              }}
            >
              {images.map((img, i) => (
                <SwiperSlide key={i}>
                  <div className="relative group rounded-lg overflow-hidden shadow-md">
                    <img
                      src={img}
                      alt={`${modernTitles[category]} ${i + 1}`}
                      className="w-full h-64 sm:h-72 md:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white p-2 text-center text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      {modernTitles[category]} Highlight {i + 1}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </CardContent>
        </Card>
      ))}

      {/* Booking Section */}
  

      {/* Booking/Login Modal */}

    </div>
  );
}








































































