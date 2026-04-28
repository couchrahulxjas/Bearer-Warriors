import { createContext, useContext, type ReactNode } from "react";

type FeatureFlags = {
  isChatEnabled: boolean;
  isStoriesEnabled: boolean;
  isBookingEnabled: boolean;
};

const defaultFlags: FeatureFlags = {
  isChatEnabled: true,
  isStoriesEnabled: true,
  isBookingEnabled: true,
};

const FeatureFlagContext = createContext<FeatureFlags>(defaultFlags);

export function FeatureFlagProvider({ children, flags = defaultFlags }: { children: ReactNode, flags?: FeatureFlags }) {
  // In a real scenario, this would fetch from the `platform_settings` table in Supabase
  // using TanStack React Query.
  return (
    <FeatureFlagContext.Provider value={flags}>
      {children}
    </FeatureFlagContext.Provider>
  );
}

export const useFeatureFlags = () => useContext(FeatureFlagContext);
