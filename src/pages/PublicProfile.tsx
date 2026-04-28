import { useParams } from "react-router-dom";
import { BookOpen, UserCircle2 } from "lucide-react";

export function PublicProfile() {
  const { id } = useParams();

  // Mock data fetching based on id
  const profileDetails = {
    name: id === "john" ? "John Doe" : "Anonymous Tiger",
    joined: "Member since Aug 2024",
    bio: "Just taking it one step at a time. Sharing my thoughts quietly.",
    stories: [
      { id: "s1", title: "When the anxiety hits at 3 AM", text: "I found that pacing the room doesn't help...", date: "4 days ago" },
      { id: "s2", title: "Therapy was harder than I thought", text: "My first session left me exhausted, but good exhausted.", date: "1 week ago" }
    ]
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-12">
      <div className="flex flex-col items-center text-center bg-card border border-border p-8 rounded-2xl mb-8 shadow-sm">
        <UserCircle2 className="w-20 h-20 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold text-foreground">{profileDetails.name}</h1>
        <p className="text-xs font-medium text-primary mt-1">{profileDetails.joined}</p>
        <p className="text-sm text-muted-foreground mt-4 max-w-sm">{profileDetails.bio}</p>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg flex items-center gap-2 mb-6">
          <BookOpen className="w-5 h-5 text-primary" /> Published Stories
        </h3>
        
        {profileDetails.stories.map(story => (
          <div key={story.id} className="bg-card border border-border p-5 rounded-xl hover:border-primary/40 transition-colors">
            <h4 className="font-medium text-foreground text-sm">{story.title}</h4>
            <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{story.text}</p>
            <div className="text-[10px] uppercase font-semibold text-muted-foreground/60 mt-4 tracking-wider">
              {story.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
