import { useState, useCallback } from "react";

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

<<<<<<< HEAD
interface CampaignRanking {
  campaignId: string;
  position: number;
  totalParticipants: number;
  userBadges: number;
  topParticipantBadges: number;
}

interface Prize {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  imageUrl?: string;
  isAvailable: boolean;
  category: "discount" | "freebie" | "experience" | "merchandise";
}

interface CampaignPrizes {
  campaignId: string;
  totalPrizes: number;
  availablePrizes: number;
  userPoints: number;
  prizes: Prize[];
=======
interface DashboardKPIs {
  activeLivys: number;
  claimedStamps: number;
}

interface LivyStatus {
  id: string;
  name: string;
  status: 'activo' | 'inactivo' | 'finalizado';
  collaborators: string[];
  startDate: string;
  endDate: string;
}

interface StampsData {
  month: string;
  livy1: number;
  livy2: number;
  livy3: number;
}

interface Buyer {
  id: string;
  position: number;
  address: string;
  location: string;
  nftsClaimed: number;
  trend?: 'up' | 'down';
}

interface DashboardData {
  kpis: DashboardKPIs;
  livys: LivyStatus[];
  chartData: StampsData[];
  buyers: Buyer[];
>>>>>>> 20bd1f0d3be2113a57482697edcad972c5a12178
}

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchApi = useCallback(async <T>(url: string): Promise<T> => {
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
  }, []);

  const getCampaigns = useCallback(async (): Promise<Campaign[]> => {
    return fetchApi<Campaign[]>("/api/campaigns");
  }, [fetchApi]);

  const getCampaign = useCallback(
    async (id: string): Promise<Campaign> => {
      return fetchApi<Campaign>(`/api/campaigns/${id}`);
    },
    [fetchApi]
  );

  const getBadges = useCallback(async (): Promise<Badge[]> => {
    return fetchApi<Badge[]>("/api/badges");
  }, [fetchApi]);

  const getCampaignBadges = useCallback(
    async (campaignId: string): Promise<Badge[]> => {
      return fetchApi<Badge[]>(`/api/campaigns/${campaignId}/badges`);
    },
    [fetchApi]
  );

  const getUserProfile = useCallback(async (): Promise<UserProfile> => {
    return fetchApi<UserProfile>("/api/user/profile");
  }, [fetchApi]);

  const searchCampaigns = useCallback(
    async (query: string): Promise<Campaign[]> => {
      return fetchApi<Campaign[]>(
        `/api/campaigns/search?q=${encodeURIComponent(query)}`
      );
    },
    [fetchApi]
  );

<<<<<<< HEAD
  const getCampaignRanking = useCallback(
    async (campaignId: string): Promise<CampaignRanking> => {
      return fetchApi<CampaignRanking>(`/api/campaigns/${campaignId}/ranking`);
    },
    [fetchApi]
  );

  const getCampaignPrizes = useCallback(
    async (campaignId: string): Promise<CampaignPrizes> => {
      return fetchApi<CampaignPrizes>(`/api/campaigns/${campaignId}/prizes`);
    },
    [fetchApi]
  );
=======
  const getDashboardData = useCallback(async (): Promise<DashboardData> => {
    return fetchApi<DashboardData>("/api/dashboard");
  }, [fetchApi]);

  const getLivyData = useCallback(async (livyId: string): Promise<any> => {
    return fetchApi<any>(`/api/livy/${livyId}`);
  }, [fetchApi]);
>>>>>>> 20bd1f0d3be2113a57482697edcad972c5a12178

  return {
    loading,
    error,
    getCampaigns,
    getCampaign,
    getBadges,
    getCampaignBadges,
    getUserProfile,
    searchCampaigns,
<<<<<<< HEAD
    getCampaignRanking,
    getCampaignPrizes,
=======
    getDashboardData,
    getLivyData,
>>>>>>> 20bd1f0d3be2113a57482697edcad972c5a12178
  };
};
