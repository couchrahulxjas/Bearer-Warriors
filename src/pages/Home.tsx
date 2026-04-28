import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, HeartPulse, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { storiesApi } from "../lib/api";

interface Story {
  id: string;
  title: string;
  content: string;
  tags: string[];
  upvotes: number;
  author: string;
}

export function Hero() {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStories = async () => {
      try {
        const response = await storiesApi.getAll();
        // Take first 3 stories, sorted by upvotes
        const topStories = (response.data || [])
          .sort((a: any, b: any) => b.upvotes - a.upvotes)
          .slice(0, 3);
        setStories(topStories);
      } catch (error) {
        console.error('Failed to load stories:', error);
        // Fallback to empty array
        setStories([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadStories();
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-background py-24 lg:py-32 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h1 className="text-5xl font-bold tracking-tight sm:text-7xl text-foreground font-serif">
                You are not alone, <br /><i className="text-primary italic">Warrior.</i>
              </h1>
              <p className="mt-8 text-lg leading-relaxed text-muted-foreground max-w-xl mx-auto font-sans">
                A safe, anonymous sanctuary for students to share their story, seek guidance, and build a resilient mental health community.
              </p>
              <div className="mt-12 flex items-center justify-center gap-x-6">
                <Link
                  to="/signup"
                  className="rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-transform hover:-translate-y-0.5 flex items-center gap-2 shadow-sm"
                >
                  Join the Community <ArrowRight size={16} />
                </Link>
                <Link to="/about" className="text-sm font-medium leading-6 text-muted-foreground hover:text-foreground transition-colors group">
                  Learn more <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Feed Selection */}
      <section className="py-24 bg-muted/20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col gap-12">
          <div className="flex items-baseline justify-between border-b border-border pb-6">
            <h2 className="text-3xl font-serif text-foreground">Recent Stories</h2>
            <Link to="/stories" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">View all stories</Link>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[300px]">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="w-5 h-5 animate-spin" />
                Loading stories...
              </div>
            </div>
          ) : stories.length === 0 ? (
            <div className="flex items-center justify-center min-h-[300px] text-muted-foreground">
              <p>No stories yet. Be the first to share your experience!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stories.map((story, i) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                  className="bg-card text-card-foreground border border-border/60 p-6 sm:p-8 rounded-2xl flex flex-col gap-5 hover:border-primary/30 transition-colors"
                >
                  <div className="flex gap-2">
                    {story.tags.map(tag => (
                      <span key={tag} className={`tag-${tag} px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-md`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div>
                    <h3 className="text-xl font-serif mb-3 leading-snug">{story.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed font-sans">{story.content}</p>
                  </div>
                  <div className="mt-auto pt-5 border-t border-border/40 flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground tracking-tight">{story.author}</span>
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <HeartPulse size={14} className="text-primary/70" /> {story.upvotes}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
