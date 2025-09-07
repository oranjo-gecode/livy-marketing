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

// Mock ranking data for campaigns
const mockCampaignRankings = [
  {
    campaignId: "1",
    position: 15,
    totalParticipants: 150,
    userBadges: 3,
    topParticipantBadges: 8,
  },
  {
    campaignId: "2",
    position: 8,
    totalParticipants: 89,
    userBadges: 2,
    topParticipantBadges: 5,
  },
  {
    campaignId: "3",
    position: 3,
    totalParticipants: 234,
    userBadges: 5,
    topParticipantBadges: 6,
  },
];

// Mock prizes data for campaigns
const mockCampaignPrizes = [
  {
    campaignId: "1",
    totalPrizes: 3,
    availablePrizes: 2,
    userPoints: 30, // 3 badges * 10 points each
    prizes: [
      {
        id: "1",
        name: "Free Coffee",
        description: "Any size coffee at participating locations",
        pointsRequired: 50,
        isAvailable: true,
        category: "freebie",
      },
      {
        id: "2",
        name: "Museum Pass",
        description: "Free entry to all participating museums",
        pointsRequired: 100,
        isAvailable: true,
        category: "experience",
      },
      {
        id: "3",
        name: "Gift Card $25",
        description: "Redeemable at partner stores",
        pointsRequired: 250,
        isAvailable: false,
        category: "discount",
      },
    ],
  },
  {
    campaignId: "2",
    totalPrizes: 4,
    availablePrizes: 3,
    userPoints: 20, // 2 badges * 10 points each
    prizes: [
      {
        id: "4",
        name: "Art Workshop",
        description: "Free art workshop at participating museums",
        pointsRequired: 30,
        isAvailable: true,
        category: "experience",
      },
      {
        id: "5",
        name: "Museum Merchandise",
        description: "Exclusive museum store discount",
        pointsRequired: 60,
        isAvailable: true,
        category: "merchandise",
      },
      {
        id: "6",
        name: "VIP Tour",
        description: "Private guided tour of all museums",
        pointsRequired: 120,
        isAvailable: true,
        category: "experience",
      },
      {
        id: "7",
        name: "Annual Pass",
        description: "Free annual pass to all participating museums",
        pointsRequired: 200,
        isAvailable: false,
        category: "discount",
      },
    ],
  },
  {
    campaignId: "3",
    totalPrizes: 5,
    availablePrizes: 4,
    userPoints: 50, // 5 badges * 10 points each
    prizes: [
      {
        id: "8",
        name: "Conference Swag",
        description: "Exclusive tech conference merchandise",
        pointsRequired: 25,
        isAvailable: true,
        category: "merchandise",
      },
      {
        id: "9",
        name: "Tech Book",
        description: "Latest programming book of your choice",
        pointsRequired: 40,
        isAvailable: true,
        category: "freebie",
      },
      {
        id: "10",
        name: "Mentorship Session",
        description: "1-hour session with senior developer",
        pointsRequired: 75,
        isAvailable: true,
        category: "experience",
      },
      {
        id: "11",
        name: "Premium Course",
        description: "Access to premium online course",
        pointsRequired: 150,
        isAvailable: true,
        category: "experience",
      },
      {
        id: "12",
        name: "Conference Ticket",
        description: "Free ticket to next major tech conference",
        pointsRequired: 300,
        isAvailable: false,
        category: "discount",
      },
    ],
  },
];

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

  // Get campaign ranking
  http.get("/api/campaigns/:id/ranking", ({ params }) => {
    const ranking = mockCampaignRankings.find(
      (r) => r.campaignId === params.id
    );

    if (!ranking) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json({
      success: true,
      data: ranking,
    });
  }),

  // Get campaign prizes
  http.get("/api/campaigns/:id/prizes", ({ params }) => {
    const prizes = mockCampaignPrizes.find((p) => p.campaignId === params.id);

    if (!prizes) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json({
      success: true,
      data: prizes,
    });
  }),
];
