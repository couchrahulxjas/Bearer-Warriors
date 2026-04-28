import { Heart, Users, HeartPulse } from "lucide-react";

export function About() {
  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="mx-auto bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
          <Heart className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">Our Mission</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Bearer Warriors is dedicated to empowering students by providing a safe, anonymous sanctuary for shared experiences, peer support, and professional guidance.
        </p>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {[
          { icon: Heart, title: "Anonymity First", desc: "Share your truths without fear. Your identity remains protected." },
          { icon: Users, title: "Peer Community", desc: "Real empathy from fellow students walking the same path." },
          { icon: HeartPulse, title: "Mental Resilience", desc: "Providing tools and access to professionals to rebuild strength." }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center p-6 bg-card rounded-xl border border-border shadow-sm">
            <item.icon className="w-6 h-6 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
