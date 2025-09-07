import { http, HttpResponse } from "msw";

// Mock data for campaigns
const mockCampaigns = [
  {
    id: "1",
    name: "Coffee Afternoons",
    description: "Starbucks · Britt",
    badgeCount: 2,
    gradient: "brown" as const,
    badges: [
      { id: "1", gradient: "brown", earnedAt: "2024-01-15T10:30:00Z" },
      { id: "2", gradient: "brown", earnedAt: "2024-01-22T14:15:00Z" },
      { id: "3", gradient: "brown", earnedAt: "2024-01-29T16:45:00Z" },
    ],
  },
  {
    id: "2",
    name: "Art City Tour",
    description: "Museo Nacional · Museo de Jade · Museo de Oro",
    badgeCount: 2,
    gradient: "red" as const,
    badges: [
      { id: "4", gradient: "red", earnedAt: "2024-02-01T11:20:00Z" },
      { id: "5", gradient: "red", earnedAt: "2024-02-08T13:40:00Z" },
    ],
  },
  {
    id: "3",
    name: "Tech Meetups",
    description: "React Conf · Vue.js Summit · Angular Connect",
    badgeCount: 5,
    gradient: "orange-purple" as const,
    badges: [
      { id: "6", gradient: "orange-purple", earnedAt: "2024-01-10T09:00:00Z" },
      { id: "7", gradient: "orange-purple", earnedAt: "2024-01-17T10:30:00Z" },
      { id: "8", gradient: "orange-purple", earnedAt: "2024-01-24T14:00:00Z" },
      { id: "9", gradient: "orange-purple", earnedAt: "2024-01-31T16:30:00Z" },
      { id: "10", gradient: "orange-purple", earnedAt: "2024-02-07T11:15:00Z" },
    ],
  },
];

// Mock data for user profile
const mockUserProfile = {
  id: "5768",
  name: "John Doe",
  totalBadges: 10,
  memberSince: "2023-06-15T00:00:00Z",
  latestBadge: {
    id: "10",
    campaignId: "3",
    campaignName: "Tech Meetups",
    gradient: "orange-purple",
    earnedAt: "2024-02-07T11:15:00Z",
  },
};

// Mock data for all stamps/badges
const mockAllBadges = [
  // Coffee Afternoons badges
  {
    id: "1",
    campaignId: "1",
    campaignName: "Coffee Afternoons",
    gradient: "brown",
    earnedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    campaignId: "1",
    campaignName: "Coffee Afternoons",
    gradient: "brown",
    earnedAt: "2024-01-22T14:15:00Z",
  },
  {
    id: "3",
    campaignId: "1",
    campaignName: "Coffee Afternoons",
    gradient: "brown",
    earnedAt: "2024-01-29T16:45:00Z",
  },

  // Art City Tour badges
  {
    id: "4",
    campaignId: "2",
    campaignName: "Art City Tour",
    gradient: "red",
    earnedAt: "2024-02-01T11:20:00Z",
  },
  {
    id: "5",
    campaignId: "2",
    campaignName: "Art City Tour",
    gradient: "red",
    earnedAt: "2024-02-08T13:40:00Z",
  },

  // Tech Meetups badges
  {
    id: "6",
    campaignId: "3",
    campaignName: "Tech Meetups",
    gradient: "orange-purple",
    earnedAt: "2024-01-10T09:00:00Z",
  },
  {
    id: "7",
    campaignId: "3",
    campaignName: "Tech Meetups",
    gradient: "orange-purple",
    earnedAt: "2024-01-17T10:30:00Z",
  },
  {
    id: "8",
    campaignId: "3",
    campaignName: "Tech Meetups",
    gradient: "orange-purple",
    earnedAt: "2024-01-24T14:00:00Z",
  },
  {
    id: "9",
    campaignId: "3",
    campaignName: "Tech Meetups",
    gradient: "orange-purple",
    earnedAt: "2024-01-31T16:30:00Z",
  },
  {
    id: "10",
    campaignId: "3",
    campaignName: "Tech Meetups",
    gradient: "orange-purple",
    earnedAt: "2024-02-07T11:15:00Z",
  },
];

export const handlers = [
  // Get all campaigns for a user
  http.get("/api/campaigns", () => {
    return HttpResponse.json({
      success: true,
      data: mockCampaigns,
      total: mockCampaigns.length,
    });
  }),

  // Get a specific campaign by ID
  http.get("/api/campaigns/:id", ({ params }) => {
    const campaign = mockCampaigns.find((c) => c.id === params.id);

    if (!campaign) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json({
      success: true,
      data: campaign,
    });
  }),

  // Get all stamps/badges for a user
  http.get("/api/badges", () => {
    return HttpResponse.json({
      success: true,
      data: mockAllBadges,
      total: mockAllBadges.length,
    });
  }),

  // Get badges for a specific campaign
  http.get("/api/campaigns/:id/badges", ({ params }) => {
    const campaign = mockCampaigns.find((c) => c.id === params.id);

    if (!campaign) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json({
      success: true,
      data: campaign.badges,
      total: campaign.badges.length,
    });
  }),

  // Get user profile
  http.get("/api/user/profile", () => {
    return HttpResponse.json({
      success: true,
      data: mockUserProfile,
    });
  }),

  // Search campaigns (for the search functionality)
  http.get("/api/campaigns/search", ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get("q") || "";

    const filteredCampaigns = mockCampaigns.filter(
      (campaign) =>
        campaign.name.toLowerCase().includes(query.toLowerCase()) ||
        campaign.description.toLowerCase().includes(query.toLowerCase())
    );

    return HttpResponse.json({
      success: true,
      data: filteredCampaigns,
      total: filteredCampaigns.length,
      query,
    });
  }),
];
