// This naming is terrible, find a better name

import { Carousel, CarouselContent, CarouselItem, CarouselProgress } from "../../../components/Carousel";
import { Logo } from "../../../components/Logo";
import { Testimonial } from "./Testimonial";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    body: "Grinance makes managing my finances simple and stress-free, with powerful tools that keep me on track every day!",
    authorName: "Robert Smith",
    authorTitle: "Marketing Manager",
    imgSrc: "/testimonial-profile-pic-1.jpg",
  },
  {
    id: 2,
    body: "Grinance is the ultimate tool for staying on top of my budget and reaching my financial goals effortlessly.",
    authorName: "Melinda Brown",
    authorTitle: "PhD Student",
    imgSrc: "/testimonial-profile-pic-2.jpg",
  },
  {
    id: 3,
    body: "Grinance simplifies my financial planning and keeps me in control of my money like never before.",
    authorName: "George Murray",
    authorTitle: "CEO @ Cumbersome",
    imgSrc: "/testimonial-profile-pic-3.jpg",
  },
];

export function LeftPaneTestimonials() {
  return (
    <aside className="h-full flex flex-col justify-between p-4 bg-gradient-to-bl from-white to-emerald-100">
      <Logo isCollapsed={false} />
      <Carousel
        plugins={[
          Autoplay({
            delay: 15000,
          }),
          Fade({
            active: true,
          }),
        ]}
      >
        <CarouselContent>
          {TESTIMONIALS.map((testimonial) => (
            <CarouselItem key={testimonial.id}>
              <CarouselProgress />
              <Testimonial testimonial={testimonial} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <p className="text-[10px]">&copy; Grinance 2025</p>
    </aside>
  );
}
