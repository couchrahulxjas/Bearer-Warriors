import { useState, useEffect } from "react";
import { Settings, Image as ImageIcon, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { userApi } from "../lib/api";

export function Profile() {
  const [name, setName] = useState("Anonymous User");
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const loadProfile = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await userApi.getProfile(userId);
        setName(response.data.name);
        setBio(response.data.bio);
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [userId]);
  
  const stories = [
    { id: "1", title: "Overcoming Anxiety in College", date: "Oct 12, 2025" },
    { id: "2", title: "Taking Control Back", date: "Nov 04, 2025" },
  ];

  const handleSave = async () => {
    if (!userId) {
      toast.error("Please log in first");
      return;
    }

    setIsSaving(true);
    try {
      await userApi.updateProfile(userId, name, bio);
      localStorage.setItem('userName', name);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">Your Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your identity down to the details.</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Settings Area */}
          <div className="md:col-span-1 flex flex-col gap-6">
            <div className="bg-card border border-border p-6 rounded-xl flex flex-col items-center text-center">
              <div className="relative group mb-4">
                <div className="w-24 h-24 rounded-full border-2 border-border flex items-center justify-center bg-primary/10 text-primary font-serif text-3xl font-medium tracking-tighter">
                  {name.charAt(0).toUpperCase()}
                </div>
                <div className="absolute inset-0 bg-black/40 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <ImageIcon className="w-5 h-5" />
                </div>
              </div>
              <h2 className="font-semibold text-lg">{name}</h2>
              <p className="text-xs text-muted-foreground">{userId}</p>
            </div>
          
          <div className="bg-card border border-border p-6 rounded-xl">
            <h3 className="font-medium mb-4 flex items-center gap-2 text-sm">
              <Settings className="w-4 h-4 text-primary" /> Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Display Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={e => setName(e.target.value)}
                  className="w-full text-sm h-9 px-3 rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary" 
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Bio</label>
                <textarea 
                  value={bio} 
                  onChange={e => setBio(e.target.value)}
                  placeholder="Tell us about yourself..."
                  className="w-full text-sm h-24 p-3 rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary resize-none" 
                />
              </div>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="w-full mt-2 h-9 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Stories Area */}
        <div className="md:col-span-2">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold text-lg tracking-tight mb-4">Your Shared Stories</h3>
            {stories.length === 0 ? (
               <p className="text-sm text-muted-foreground py-4">You haven't shared anything yet.</p>
            ) : (
              <div className="space-y-3">
                {stories.map(story => (
                  <div key={story.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                    <div>
                      <h4 className="font-medium text-sm text-foreground">{story.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{story.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1.5 text-muted-foreground hover:text-destructive rounded-md transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
