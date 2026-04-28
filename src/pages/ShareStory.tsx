import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import { storiesApi } from "../lib/api";

const availableTags = ["mental", "control", "drugs", "life"];

const storySchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters.").max(100, "Title is too long."),
  content: z.string().min(20, "Please share a bit more detail (min 20 characters).").max(3000, "Story is too long."),
  isAnonymous: z.boolean().default(true),
});

type StoryFormValues = z.infer<typeof storySchema>;

export function ShareStory() {
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<StoryFormValues>({
    resolver: zodResolver(storySchema),
    defaultValues: {
      isAnonymous: true
    }
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const onSubmit = async (data: StoryFormValues) => {
    if (selectedTags.length === 0) {
      toast.error("Please select at least one tag.");
      return;
    }
    
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error("Please log in first");
      navigate('/login');
      return;
    }

    setIsSubmitting(true);
    try {
      await storiesApi.create(data.title, data.content, selectedTags, userId, data.isAnonymous);
      toast.success("Your story has been safely shared.");
      navigate("/");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to share story");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-12">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft size={16} /> Back to Community
      </Link>
      
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-serif mb-2">Share Your Story</h1>
        <p className="text-muted-foreground font-sans">
          Your truth holds immense power. By sharing your experience, you help someone else realize they aren't alone.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-card border border-border p-6 sm:p-8 rounded-2xl shadow-sm">
        
        {/* Tags Selection */}
        <div>
          <label className="block text-sm font-medium mb-3">Topic Tags</label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map(tag => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-200 border ${
                    isSelected 
                      ? `tag-${tag} ring-2 ring-primary/20` 
                      : "bg-background text-muted-foreground border-border/60 hover:border-primary/40"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input 
            {...register("title")}
            placeholder="Sum up your experience in a brief title"
            className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-serif text-lg"
          />
          {errors.title && <p className="text-destructive text-xs mt-1.5">{errors.title.message}</p>}
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium mb-2">Your Experience</label>
          <textarea 
            {...register("content")}
            placeholder="Take your time. What's been on your mind lately?..."
            className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all min-h-[250px] resize-y font-sans leading-relaxed"
          />
          {errors.content && <p className="text-destructive text-xs mt-1.5">{errors.content.message}</p>}
        </div>

        {/* Anonymous Toggle */}
        <div className="pt-4 border-t border-border/50 flex items-center justify-between">
          <div>
            <span className="block text-sm font-medium">Post Anonymously</span>
            <span className="block text-xs text-muted-foreground mt-0.5">Hide your display name from the community feed.</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" {...register("isAnonymous")} className="sr-only peer" />
            <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-background after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-border/50"></div>
          </label>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 bg-foreground text-background font-medium py-3 rounded-full hover:bg-foreground/90 transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Publishing...
            </>
          ) : (
            <>
              Publish Story <Send size={16} />
            </>
          )}
        </button>

      </form>
    </div>
  );
}
