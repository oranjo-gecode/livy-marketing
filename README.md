# Livy Marketing Mobile App

A React-based mobile application for managing and displaying user badges and campaigns.

## Features

- **Mobile-First Design**: Responsive mobile interface with Tailwind CSS
- **Badge Management**: View and organize user badges from different campaigns
- **Campaign Support**: Multiple campaign types with unique badge designs
- **Mock API Integration**: MSW (Mock Service Worker) for development and testing

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Available Routes

- **`/`** - Home page with navigation
- **`/mobile`** - Mobile app interface

## Mock API Endpoints

The app uses MSW (Mock Service Worker) to provide mock APIs during development. The following endpoints are available:

### Campaigns

- `GET /api/campaigns` - Get all campaigns for the user
- `GET /api/campaigns/:id` - Get a specific campaign by ID
- `GET /api/campaigns/:id/badges` - Get badges for a specific campaign
- `GET /api/campaigns/search?q=query` - Search campaigns by name or description

### Badges

- `GET /api/badges` - Get all badges for the user

### User Profile

- `GET /api/user/profile` - Get user profile information

## Mock Data Structure

### Campaign

```typescript
{
  id: string
  name: string
  description: string
  badgeCount: number
  gradient: 'orange-purple' | 'brown' | 'red'
  badges: Badge[]
}
```

### Badge

```typescript
{
  id: string;
  campaignId: string;
  campaignName: string;
  gradient: "orange-purple" | "brown" | "red";
  earnedAt: string;
}
```

### User Profile

```typescript
{
  id: string;
  name: string;
  totalBadges: number;
  memberSince: string;
  latestBadge: Badge;
}
```

## Using the Mock APIs

The app includes a custom hook `useApi()` that provides easy access to all mock endpoints:

```typescript
import { useApi } from "../hooks/useApi";

const { getCampaigns, getBadges, getUserProfile } = useApi();

// Fetch campaigns
const campaigns = await getCampaigns();

// Fetch user profile
const profile = await getUserProfile();
```

## Development

### MSW Setup

- Mock Service Worker is automatically started in development mode
- Mock handlers are located in `src/mocks/handlers.ts`
- Service worker file is in `public/mockServiceWorker.js`

### Adding New Mock Endpoints

1. Add new handlers in `src/mocks/handlers.ts`
2. Update the `useApi` hook in `src/hooks/useApi.ts`
3. Use the new endpoints in your components

## Building for Production

```bash
npm run build
```

## Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **MSW** - Mock API service worker
- **React Router** - Client-side routing

## Project Structure

```
src/
├── components/          # Reusable UI components
├── mobile/             # Mobile app pages
├── hooks/              # Custom React hooks
├── mocks/              # MSW mock API setup
├── assets/             # Static assets (logos, images)
└── App.tsx             # Main application component
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is private and proprietary.
