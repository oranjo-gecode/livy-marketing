import { useState } from "react";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  total?: number;
  query?: string;
}

interface Campaign {
  id: string;
  name: string;
  description: string;
  badgeCount: number;
  gradient: "orange-purple" | "brown" | "red";
  badges: Array<{
    id: string;
    gradient: "orange-purple" | "brown" | "red";
    earnedAt: string;
  }>;
}

interface Badge {
  id: string;
  campaignId: string;
  campaignName: string;
  gradient: "orange-purple" | "brown" | "red";
  earnedAt: string;
}

interface UserProfile {
  id: string;
  name: string;
  totalBadges: number;
  memberSince: string;
  latestBadge: {
    id: string;
    campaignId: string;
    campaignName: string;
    gradient: "orange-purple" | "brown" | "red";
    earnedAt: string;
  };
}

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchApi = async <T>(url: string): Promise<T> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ApiResponse<T> = await response.json();
      return data.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getCampaigns = async (): Promise<Campaign[]> => {
    return fetchApi<Campaign[]>("/api/campaigns");
  };

  const getCampaign = async (id: string): Promise<Campaign> => {
    return fetchApi<Campaign>(`/api/campaigns/${id}`);
  };

  const getBadges = async (): Promise<Badge[]> => {
    return fetchApi<Badge[]>("/api/badges");
  };

  const getCampaignBadges = async (campaignId: string): Promise<Badge[]> => {
    return fetchApi<Badge[]>(`/api/campaigns/${campaignId}/badges`);
  };

  const getUserProfile = async (): Promise<UserProfile> => {
    return fetchApi<UserProfile>("/api/user/profile");
  };

  const searchCampaigns = async (query: string): Promise<Campaign[]> => {
    return fetchApi<Campaign[]>(
      `/api/campaigns/search?q=${encodeURIComponent(query)}`
    );
  };

  return {
    loading,
    error,
    getCampaigns,
    getCampaign,
    getBadges,
    getCampaignBadges,
    getUserProfile,
    searchCampaigns,
  };
};
