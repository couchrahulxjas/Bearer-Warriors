import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/providers/theme-provider";
import { FeatureFlagProvider } from "./components/providers/feature-flag-provider";
import { Navbar } from "./components/layout/Navbar";
import { Toaster } from "sonner";
import { Hero } from "./pages/Home";
import { Auth } from "./pages/Auth";
import { Rooms } from "./pages/Rooms";
import { Chat } from "./pages/Chat";
import { Consult } from "./pages/Consult";
import { BookSession } from "./pages/BookSession";
import { About } from "./pages/About";
import { Profile } from "./pages/Profile";
import { PublicProfile } from "./pages/PublicProfile";
import { Admin } from "./pages/Admin";
import { ShareStory } from "./pages/ShareStory";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="warriors-theme">
      <FeatureFlagProvider>
        <Router>
          <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30">
            <Navbar />
            <main className="flex-1 flex flex-col">
              <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/signup" element={<Auth />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/consult" element={<Consult />} />
                <Route path="/book-session" element={<BookSession />} />
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/public-profile/:id" element={<PublicProfile />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/share-story" element={<ShareStory />} />
              </Routes>
            </main>
            <Toaster richColors position="top-center" />
          </div>
        </Router>
      </FeatureFlagProvider>
    </ThemeProvider>
  );
}
