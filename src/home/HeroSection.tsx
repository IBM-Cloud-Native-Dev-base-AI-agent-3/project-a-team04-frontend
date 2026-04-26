import { motion } from 'motion/react';
import { APP_THEME } from '@/constants/theme';

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <iframe
          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100svh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 object-cover"
          src="https://www.youtube.com/embed/1rEzjdrfdxk?autoplay=1&mute=1&controls=0&loop=1&playlist=1rEzjdrfdxk&playsinline=1&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1"
          title="WIC 2020 Background Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-white"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center mb-4">
              <span className="font-black text-7xl md:text-[120px] tracking-tighter text-white drop-shadow-2xl">WIC</span>
              <span
                className="font-black text-7xl md:text-[120px] tracking-tighter drop-shadow-2xl"
                style={{ color: APP_THEME.colors.logoBlue }}
              >
                2020
              </span>
            </div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-3 rounded-full inline-block"
            >
              <p className="text-xl md:text-3xl font-bold tracking-widest">
                2020. 04. 15(WED) - 17(FRI) | COEX
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
