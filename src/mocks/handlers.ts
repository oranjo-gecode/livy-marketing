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

  // Get dashboard data
  http.get("/api/dashboard", () => {
    const dashboardData = {
      kpis: {
        activeLivys: 3,
        claimedStamps: 13075
      },
      livys: [
        {
          id: '1',
          name: 'Sip & Paint vol.2',
          status: 'activo' as const,
          collaborators: ['Bacano Escalante', 'Jogo'],
          startDate: '2024-01-15',
          endDate: '2024-02-15'
        },
        {
          id: '2', 
          name: 'Sip & Paint vol.1',
          status: 'inactivo' as const,
          collaborators: ['Rosti Spoon'],
          startDate: '2023-12-01',
          endDate: '2023-12-31'
        },
        {
          id: '3',
          name: 'Summer Pass',
          status: 'activo' as const,
          collaborators: ['Bacano Escalante', 'Jogo', 'Rosti Spoon'],
          startDate: '2024-01-01',
          endDate: '2024-03-31'
        },
        {
          id: '4',
          name: 'Hola Navidad!',
          status: 'finalizado' as const,
          collaborators: ['Bacano Escalante'],
          startDate: '2023-12-01',
          endDate: '2023-12-25'
        }
      ],
      chartData: [
        { month: 'jul', livy1: 1200, livy2: 800, livy3: 600 },
        { month: 'ago', livy1: 1400, livy2: 900, livy3: 700 },
        { month: 'set', livy1: 1600, livy2: 1100, livy3: 800 },
        { month: 'oct', livy1: 1800, livy2: 1300, livy3: 900 }
      ],
      buyers: [
        { id: '1', position: 1, address: 'ID123', location: 'Restaurante 12/0', nftsClaimed: 98, trend: 'up' as const },
        { id: '2', position: 2, address: 'ID124', location: 'Plaza del sol', nftsClaimed: 94, trend: 'down' as const },
        { id: '3', position: 3, address: 'ID125', location: 'Galería x', nftsClaimed: 91, trend: 'up' as const },
        { id: '4', position: 4, address: 'ID126', location: 'Restaurante 12/0', nftsClaimed: 87 },
        { id: '5', position: 5, address: 'ID127', location: 'Plaza del sol', nftsClaimed: 82, trend: 'up' as const },
        { id: '6', position: 6, address: 'ID128', location: 'Galería x', nftsClaimed: 78 },
        { id: '7', position: 7, address: 'ID129', location: 'Restaurante 12/0', nftsClaimed: 75, trend: 'down' as const },
        { id: '8', position: 8, address: 'ID130', location: 'Plaza del sol', nftsClaimed: 72 },
        { id: '9', position: 9, address: 'ID131', location: 'Galería x', nftsClaimed: 69, trend: 'up' as const },
        { id: '10', position: 10, address: 'ID132', location: 'Restaurante 12/0', nftsClaimed: 65 }
      ]
    };

    return HttpResponse.json({
      success: true,
      data: dashboardData,
    });
  }),
];
