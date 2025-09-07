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

<<<<<<< HEAD
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
=======
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

  // Get individual Livy data
  http.get("/api/livy/:id", ({ params }) => {
    const livyId = params.id as string;
    
    // Mock data for individual Livy - in a real app, this would be dynamic based on the ID
    const livyData = {
      id: livyId,
      name: 'Sip & Paint vol.2',
      kpis: {
        totalClaimedStamps: 7500,
        lastWeekStamps: 1250,
        mostPopularStamp: {
          name: 'Bri-bri reclamados',
          count: 725,
          gradient: 'purple-pink'
        }
      },
      mapLocations: [
        {
          id: '1',
          name: 'Bacano Escalante',
          nftsGenerated: 3650,
          lastWeekNfts: 520,
          coordinates: { x: 30, y: 40 }
        },
        {
          id: '2',
          name: 'Restaurante 12/0',
          nftsGenerated: 3850,
          lastWeekNfts: 730,
          coordinates: { x: 50, y: 60 }
        },
        {
          id: '3',
          name: 'Restaurante Isolina',
          nftsGenerated: 0,
          lastWeekNfts: 0,
          coordinates: { x: 70, y: 30 }
        }
      ],
      collaborators: [
        { id: '1', name: 'Restaurante 12/0', status: 'activo' as const },
        { id: '2', name: 'Bacano Escalante', status: 'activo' as const },
        { id: '3', name: 'Isolina', status: 'en proceso' as const }
      ],
      locationRanking: [
        { id: '1', name: 'Restaurante 12/0', nftsGenerated: 3850 },
        { id: '2', name: 'Bacano Escalante', nftsGenerated: 3650 },
        { id: '3', name: 'Isolina', nftsGenerated: 0 }
      ],
      buyerRanking: [
        { id: '1', position: 1, address: '123', nftsClaimed: 98 },
        { id: '2', position: 2, address: '123', nftsClaimed: 56, trend: 'up' as const },
        { id: '3', position: 3, address: '123', nftsClaimed: 45 },
        { id: '4', position: 4, address: '123', nftsClaimed: 42, trend: 'down' as const },
        { id: '5', position: 5, address: '123', nftsClaimed: 35 }
      ],
      allLivys: [
        { id: '1', name: 'Sip & Paint vol.2' },
        { id: '2', name: 'Sip & Paint vol.1' },
        { id: '3', name: 'Summer Pass' },
        { id: '4', name: 'Hola Navidad!' }
      ]
    };

    return HttpResponse.json({
      success: true,
      data: livyData,
>>>>>>> 20bd1f0d3be2113a57482697edcad972c5a12178
    });
  }),
];
