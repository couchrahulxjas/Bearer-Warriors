import { Link } from "react-router-dom";
import { useTheme } from "../providers/theme-provider";
import { Moon, Sun, Heart, Menu, X, User } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Rooms & Chat", path: "/rooms" },
    { name: "Consult", path: "/consult" },
  ];

  return (
    <div className="w-full flex justify-center sticky top-4 z-50 px-4">
      <nav className="w-full max-w-5xl rounded-full border border-border/40 bg-background/80 backdrop-blur-md shadow-sm">
        <div className="px-5 md:px-8 flex justify-between h-14 items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <Heart className="text-primary group-hover:scale-105 transition-transform" size={20} />
            <span className="font-serif italic text-xl tracking-tight text-foreground -mb-1">
              Bearer Warriors
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex gap-5">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3 border-l border-border/50 pl-6 ml-2">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </button>
              
              <Link
                to="/login"
                className="text-[13px] font-medium hover:text-foreground text-muted-foreground transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/share-story"
                className="bg-foreground text-background px-4 py-1.5 rounded-full text-[13px] font-medium hover:bg-foreground/90 transition-all shadow-sm -mr-2"
              >
                Share Story
              </Link>
              <Link to="/profile" className="ml-2 text-muted-foreground hover:text-foreground transition-colors">
                <User size={16} />
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-muted-foreground"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-border/40 overflow-hidden"
            >
              <div className="flex flex-col px-6 py-4 gap-3 bg-background/95 rounded-b-3xl">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground py-1"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="h-px bg-border/50 my-2" />
                <Link to="/profile" onClick={() => setIsOpen(false)} className="text-sm font-medium py-1">Profile</Link>
                <Link to="/login" onClick={() => setIsOpen(false)} className="text-sm font-medium py-1">Log in</Link>
                <Link to="/share-story" onClick={() => setIsOpen(false)} className="text-sm font-medium text-primary py-1">Share Story</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
