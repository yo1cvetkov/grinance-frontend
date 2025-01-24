import { FaStar } from "react-icons/fa";

export type Testimonial = {
  id: number;
  body: string;
  imgSrc: string;
  authorName: string;
  authorTitle: string;
};

interface TestimonialProps {
  testimonial: Testimonial;
}

export function Testimonial({ testimonial: { authorName, authorTitle, body, imgSrc } }: TestimonialProps) {
  return (
    <div className="flex flex-1 flex-col items-center gap-y-8 relative">
      <h2 className="text-3xl text-zinc-700 text-center max-w-xl font-display font-medium px-4">{body}</h2>
      <div className="flex flex-col gap-y-4 items-center">
        <div className="rounded-full w-16 h-16 overflow-hidden">
          <img src={imgSrc} alt="Profile picture" />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-base font-semibold">{authorName}</p>
          <p className="text-sm text-zinc-500">{authorTitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-x-1">
        <FaStar size={20} className="text-amber-400" />
        <FaStar size={20} className="text-amber-400" />
        <FaStar size={20} className="text-amber-400" />
        <FaStar size={20} className="text-amber-400" />
        <FaStar size={20} className="text-amber-400" />
      </div>
    </div>
  );
}
