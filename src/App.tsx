import { Routes, Route } from 'react-router'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Mobile from './mobile/Mobile'
import CampaignDetails from './mobile/CampaignDetails'
import BadgeSuccess from './mobile/BadgeSuccess'
import Dashboard from './dashboard/Dashboard'
import LivyDashboard from './dashboard/containers/LivyDashboard'
import BuilderLayout from './builder/BuilderLayout'
import LivyConfiguration from './builder/containers/LivyConfiguration'
import CollaborationMap from './builder/containers/CollaborationMap'
import Stamp from './builder/containers/Stamp'

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard/livy/:id" element={<LivyDashboard />} />
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
          <Route path="/builder" element={<BuilderLayout />}>
            <Route index element={<LivyConfiguration />} />
            <Route path="map" element={<CollaborationMap />} />
            <Route path="stamp" element={<Stamp />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App;
