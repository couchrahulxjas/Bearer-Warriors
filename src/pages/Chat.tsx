import { useState, useRef, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Send, MoreVertical, Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { roomsApi } from "../lib/api";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp?: Date | string;
  isSystem?: boolean;
  isMe?: boolean;
  senderName?: string;
  roomId?: string;
  isAnonymous?: boolean;
  createdAt?: string;
}

export function Chat() {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("room") || "1";
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const currentUserId = localStorage.getItem('userId') || 'anonymous';
  const currentUserName = localStorage.getItem('userName') || 'Me';

  useEffect(() => {
    const loadMessages = async () => {
      setIsLoading(true);
      try {
        const response = await roomsApi.getMessages(roomId);
        const msgs = response.data || [];
        setMessages(msgs.map((msg: any) => ({
          ...msg,
          isMe: msg.sender === currentUserId,
          timestamp: new Date(msg.createdAt || Date.now())
        })));
      } catch (error) {
        console.error('Failed to load messages:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();
    
    // Reload messages every 3 seconds for real-time feel
    const interval = setInterval(loadMessages, 3000);
    return () => clearInterval(interval);
  }, [roomId, currentUserId]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSending(true);
    try {
      const isAnonymous = Math.random() > 0.3; // 70% chance of anonymous
      await roomsApi.sendMessage(
        roomId,
        message,
        currentUserId,
        currentUserName,
        isAnonymous
      );
      setMessage("");
      
      // Refresh messages
      const response = await roomsApi.getMessages(roomId);
      const msgs = response.data || [];
      setMessages(msgs.map((msg: any) => ({
        ...msg,
        isMe: msg.sender === currentUserId,
        timestamp: new Date(msg.createdAt || Date.now())
      })));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-[calc(100vh-4rem)] w-full bg-background items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] w-full bg-background">
      {/* Chat Header */}
      <div className="flex items-center justify-between border-b border-border bg-card px-4 sm:px-6 h-14 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Link to="/rooms" className="p-2 -ml-2 rounded-md hover:bg-muted text-muted-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex flex-col">
            <h1 className="font-semibold text-sm text-foreground leading-tight tracking-tight">
              Anonymous Room
            </h1>
            <span className="text-xs text-muted-foreground flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/80"></span>
              Active now
            </span>
          </div>
        </div>

        <button className="p-2 rounded-md hover:bg-muted text-muted-foreground">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <p className="text-sm">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.isMe ? "items-end" : "items-start"}`}>
              <div className="flex flex-col max-w-[85%] sm:max-w-[70%]">
                {!msg.isMe && (
                  <span className="text-xs font-medium text-muted-foreground mb-1 ml-1 select-none">
                    {msg.senderName}
                  </span>
                )}
                <div 
                  className={`
                    px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap
                    ${msg.isMe 
                      ? "bg-primary text-primary-foreground rounded-br-sm" 
                      : "bg-muted text-foreground border border-border/30 rounded-bl-sm"
                    }
                  `}
                >
                  {msg.content}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={endOfMessagesRef} />
      </div>

      {/* Chat Input */}
      <div className="bg-background border-t border-border p-4">
        <form 
          onSubmit={handleSend}
          className="max-w-4xl mx-auto relative flex items-end gap-2 bg-muted/30 p-1.5 focus-within:bg-muted/50 rounded-xl border border-input transition-colors shadow-sm"
        >
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend(e);
              }
            }}
            placeholder="Type your message anonymously..."
            className="flex-1 max-h-32 min-h-[40px] bg-transparent border-0 resize-none py-2.5 px-3 text-sm focus:ring-0 text-foreground placeholder:text-muted-foreground"
            rows={1}
          />
          <button 
            type="submit"
            disabled={!message.trim() || isSending}
            className="flex-shrink-0 h-10 w-10 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-50 disabled:bg-transparent disabled:text-muted-foreground rounded-sm transition-colors flex items-center justify-center mb-0.5 mr-0.5"
          >
            {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </form>
        <div className="text-center mt-2">
          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest opacity-60 flex items-center justify-center gap-1.5">
            <Lock className="w-2.5 h-2.5" /> End-to-end encrypted
          </p>
        </div>
      </div>
    </div>
  );
}
