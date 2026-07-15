export default function StripeHero({ children }) {
    return (
      <div className="hero-grain relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pt-32 pb-15">
        <div className="hero-cube-field pointer-events-none absolute inset-0 z-[1] flex items-center justify-center">
          <img src="/isolatedCube.webp" alt="" className="hero-cube-image h-[min(104vw,1040px)] w-[min(104vw,1040px)] object-contain" />
        </div>
  
        <div className="hero-text-stagger relative z-[2] max-w-[820px] text-center">{children}</div>
      </div>
    );
  }
  