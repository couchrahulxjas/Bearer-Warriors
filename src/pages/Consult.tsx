import { Calendar, Star, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { psychiatristsApi } from "../lib/api";

interface Psychiatrist {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  reviewCount: number;
  imageUrl?: string;
  availability?: string[];
}

export function Consult() {
  const navigate = useNavigate();
  const [professionals, setProfessionals] = useState<Psychiatrist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await psychiatristsApi.getAll();
        setProfessionals(response.data);
      } catch (error) {
        console.error('Failed to fetch psychiatrists:', error);
        // Fallback to mock data if API fails
        setProfessionals([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfessionals();
  }, []);

  const handleBooking = (psychiatristId: string) => {
    sessionStorage.setItem('selectedPsychiatristId', psychiatristId);
    navigate('/book-session');
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading professionals...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">Professional Consulting</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Connect with licensed professionals who specialize in mental health support.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {professionals.map((pro) => (
          <div key={pro.id} className="flex flex-col bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              {pro.imageUrl ? (
                <img 
                  src={pro.imageUrl} 
                  alt={pro.name} 
                  className="w-16 h-16 rounded-full object-cover border border-border flex-shrink-0 bg-muted"
                />
              ) : (
                <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center bg-primary/10 text-primary font-serif text-xl font-medium tracking-tighter flex-shrink-0">
                  {pro.name.replace("Dr. ", "").charAt(0)}
                </div>
              )}
              <div>
                <h3 className="font-semibold text-foreground text-lg tracking-tight leading-tight">{pro.name}</h3>
                <p className="text-sm text-primary font-medium">{pro.specialization}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-6 flex-1">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                <span className="text-foreground">{pro.rating}</span>
                <span>({pro.reviewCount} reviews)</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border/50 flex items-center justify-between mt-auto">
              <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <Calendar className="w-3.5 h-3.5" />
                Available
              </div>
              <button
                onClick={() => handleBooking(pro.id)}
                className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-8 px-3 text-xs font-medium hover:bg-primary/90 transition-colors"
              >
                Book
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
