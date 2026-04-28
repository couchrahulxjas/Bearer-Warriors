import { useState } from "react";
import { ArrowLeft, Clock, Calendar as CalendarIcon, Info } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { bookingApi } from "../lib/api";

export function BookSession() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const timeSlots = ["09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"];
  
  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select a date and time");
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error("Please log in first");
      navigate('/login');
      return;
    }

    // Get psychiatrist ID from URL or session storage
    const psychiatristId = sessionStorage.getItem('selectedPsychiatristId') || "1";

    setIsLoading(true);
    try {
      await bookingApi.book(userId, psychiatristId, selectedDate, selectedTime, notes);
      toast.success("Session booked successfully!");
      navigate("/consult");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to book session");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-8">
      <Link to="/consult" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Professionals
      </Link>

      <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
        <div className="mb-8 border-b border-border pb-6">
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Book a Session</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Choose an available slot for your consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-6">
            <div>
              <label className="text-sm font-medium text-foreground block mb-3">Select Date</label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            
            {selectedDate && (
              <div>
                <label className="text-sm font-medium text-foreground block mb-3">Select Time</label>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`
                        h-10 rounded-md border text-sm font-medium transition-all
                        ${selectedTime === time 
                          ? "border-primary bg-primary/10 text-primary" 
                          : "border-input bg-background text-foreground hover:border-primary/50"
                        }
                      `}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Clock className="w-3.5 h-3.5" />
                        {time}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-foreground block mb-3">Notes (Optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional notes for the professional..."
                className="w-full h-24 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-5 border border-border">
            <h3 className="font-semibold text-foreground mb-4">Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Professional</span>
                <span className="font-medium">Dr. Ananya Sharma</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Session Type</span>
                <span className="font-medium">Video Call (50m)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">{selectedDate || "Not selected"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time</span>
                <span className="font-medium">{selectedTime || "Not selected"}</span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex items-start gap-3 text-xs text-muted-foreground mb-6">
                <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <p>Sessions are completely confidential. You will receive a secure video link to your registered email 15 minutes prior to the start time.</p>
              </div>
              <button 
                onClick={handleBooking}
                disabled={!selectedDate || !selectedTime || isLoading}
                className="w-full h-10 inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Booking...
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
