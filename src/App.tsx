import { Routes, Route } from 'react-router'
import Mobile from './mobile/Mobile'
import CampaignDetails from './mobile/CampaignDetails'
import BadgeSuccess from './mobile/BadgeSuccess'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <div className="home-page">
            <h1>Welcome to Livy Marketing</h1>
            <p>This is the main page. Navigate to <a href="/mobile">/mobile</a> to see the mobile version.</p>
          </div>
        } />
        <Route path="/mobile" element={<Mobile />} />
        <Route path="/mobile/campaign/:id" element={<CampaignDetails />} />
        <Route path="/mobile/badge-success" element={<BadgeSuccess campaignName="Tech Meetups" badgeGradient="orange-purple" onClose={() => window.history.back()} />} />
      </Routes>
    </div>
  )
}

export default App
