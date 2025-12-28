import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/* -------------------- SOURCE OF TRUTH: ONLY YOUTUBE LINKS -------------------- */

const VIDEO_LINKS = [
  {
    id: 1,
    url: "https://youtu.be/KygGs3fdAJ4?si=XtZy_TnVRGGH98IX",
    category: "Career",
  },
  {
    id: 2,
    url: "https://youtu.be/Sb3CDn_sNs4?si=GWeOwlEbjpmFW9uK",
    category: "Finance",
  },
  {
    id: 3,
    url: "https://youtu.be/hDZ1-jxcm9s?si=uQkD-aPTTq2VT3pY",
    category: "Legal",
  },
  {
    id: 4,
    url: "https://youtu.be/f_a1YgUVT9s?si=fQCqQUlthEQNu9eS",
    category: "Finance",
  },
  {
    id: 5,
    url: "https://youtu.be/deGPkRmtP74?si=TI2h5aGZEZBg8PEF",
    category: "Traditional",
  },
];

/* -------------------- COMPONENT -------------------- */

export function YouTube() {
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    const fetchVideoData = async () => {
      const results = await Promise.all(
        VIDEO_LINKS.map(async (video) => {
          try {
            const res = await fetch(
              `https://www.youtube.com/oembed?url=${encodeURIComponent(
                video.url
              )}&format=json`
            );

            const data = await res.json();

            return {
              ...video,
              title: data.title,
              thumbnail: data.thumbnail_url,
            };
          } catch (err) {
            console.error("Failed to fetch video data", err);
            return null;
          }
        })
      );

      setVideos(results.filter(Boolean));
    };

    fetchVideoData();
  }, []);

  return (
    <section className="py-24 bg-transparent text-white overflow-hidden">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Featured <span className="text-emerald-500">Insights</span>
          </h2>

          <a
            href="https://youtube.com/@arvindandswamy"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-widest text-sm hover:text-emerald-300 transition-colors"
          >
            View Channel
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        {/* Video Grid - Asymmetrical Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 auto-rows-[250px] gap-6">
          {videos.map((video, idx) => {
            const gridClasses = [
              "col-span-2 row-span-2", // Large
              "col-span-2 row-span-1", // Wide
              "col-span-1 row-span-2", // Tall
              "col-span-1 row-span-1", // Small
              "col-span-2 row-span-1", // Wide
              "col-span-2 row-span-2", // Large
            ];
            
            return (
              <motion.a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  "relative group rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 bg-slate-900/50 block hover-inside-out",
                  gridClasses[idx % gridClasses.length]
                )}
              >
                {/* Real YouTube Thumbnail */}
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="absolute inset-0 w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-slate-950 opacity-60 group-hover:opacity-0 transition-opacity duration-500" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-12 h-12 bg-emerald-500/20 backdrop-blur-md rounded-full border border-emerald-500/30 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-700">
                    <Play className="w-5 h-5 fill-white text-white group-hover:text-emerald-600 group-hover:fill-emerald-600 transition-colors" />
                  </div>
                </div>

                {/* Category */}
                <div className="absolute top-6 left-6 z-10">
                  <span className="px-3 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[8px] font-bold uppercase tracking-widest text-emerald-400 group-hover:text-emerald-600 transition-colors">
                    {video.category}
                  </span>
                </div>

                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-10">
                  <h3 className="font-bold text-sm md:text-base leading-tight group-hover:text-emerald-950 transition-colors uppercase tracking-tight line-clamp-2">
                    {video.title}
                  </h3>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
