import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, Users, Lock, Loader2, MessageSquare, Shield, X } from "lucide-react";
import { roomsApi } from "../lib/api";
import { toast } from "sonner";

interface Room {
  id: string;
  name: string;
  description: string;
  participants: number;
  isPrivate: boolean;
  lastActive: string;
  messages?: string[];
}

export function Rooms() {
  const [searchQuery, setSearchQuery] = useState("");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const userId = localStorage.getItem("userId") || "anonymous";

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      const response = await roomsApi.getAll();
      setRooms(response.data || []);
    } catch (error) {
      console.error('Failed to load rooms:', error);
      toast.error('Failed to load rooms');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!roomName.trim()) {
      toast.error('Room name is required');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await roomsApi.create(roomName, roomDescription, isPrivate, userId);
      toast.success('Room created successfully!');
      setRoomName("");
      setRoomDescription("");
      setIsPrivate(false);
      setShowCreateModal(false);
      await loadRooms();
    } catch (error) {
      console.error('Failed to create room:', error);
      toast.error('Failed to create room');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredRooms = rooms.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Anonymous Rooms</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Join a conversation securely. Your identity remains protected.
          </p>
        </div>
        
        <button 
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-9 px-4 py-2 text-sm font-medium hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors shadow-sm"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Room
        </button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search rooms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div className="text-sm text-muted-foreground font-medium hidden sm:block">
          {filteredRooms.length} rooms available
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
            Loading rooms...
          </div>
        </div>
      ) : filteredRooms.length === 0 ? (
        <div className="flex items-center justify-center min-h-[300px] text-muted-foreground">
          <p>No rooms found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRooms.map((room) => (
            <Link 
              key={room.id}
              to={`/chat?room=${room.id}`}
              className="group flex flex-col p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-sm transition-all text-left relative overflow-hidden"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground text-lg tracking-tight group-hover:text-primary transition-colors">
                    {room.name}
                  </h3>
                  {room.isPrivate && (
                    <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-6 line-clamp-2 leading-relaxed">
                {room.description}
              </p>
              
              <div className="mt-auto flex items-center justify-between w-full pt-4 border-t border-border/50">
                <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                  <div className="flex items-center gap-1.5 border border-border/50 bg-muted/30 px-2 py-0.5 rounded-md">
                    <Users className="w-3.5 h-3.5" />
                    <span>{room.participants} Online</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/70 animate-pulse"></span>
                    <span>{room.lastActive}</span>
                  </div>
                </div>
                <div className="text-primary font-medium text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Enter
                  <MessageSquare className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-lg shadow-xl max-w-md w-full mx-4 p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Create New Room</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 hover:bg-muted rounded-md transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            
            <form onSubmit={handleCreateRoom} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Room Name *
                </label>
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder="e.g., Mental Health Support"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Description
                </label>
                <textarea
                  value={roomDescription}
                  onChange={(e) => setRoomDescription(e.target.value)}
                  placeholder="What is this room about?"
                  rows={3}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPrivate"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="w-4 h-4 rounded border-input cursor-pointer"
                  disabled={isSubmitting}
                />
                <label htmlFor="isPrivate" className="text-sm text-muted-foreground cursor-pointer">
                  Make this room private
                </label>
              </div>
              
              <div className="flex gap-2 justify-end pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-sm font-medium rounded-md border border-input hover:bg-muted transition-colors disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isSubmitting ? 'Creating...' : 'Create Room'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
