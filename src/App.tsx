import { Routes, Route } from 'react-router'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Mobile from './mobile/Mobile'
import CampaignDetails from './mobile/CampaignDetails'
import BadgeSuccess from './mobile/BadgeSuccess'

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <div className="home-page">
              <h1>Welcome to Livy Marketing</h1>
              <p>This is the main page. Navigate to <a href="/mobile">/mobile</a> to see the mobile version.</p>
            </div>
          } />
          <Route path="/mobile" element={
            <ProtectedRoute>
              <Mobile />
            </ProtectedRoute>
          } />
          <Route path="/mobile/campaign/:id" element={
            <ProtectedRoute>
              <CampaignDetails />
            </ProtectedRoute>
          } />
          <Route path="/mobile/badge-success" element={
            <ProtectedRoute>
              <BadgeSuccess campaignName="Tech Meetups" badgeGradient="orange-purple" onClose={() => window.history.back()} />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
