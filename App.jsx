import { useState } from 'react'
import HomePage from './HomePage'
import LockScreen from './LockScreen'
import Dashboard from './Dashboard'

export default function App() {
  const [screen, setScreen] = useState('home')
  const [role,   setRole]   = useState(null)

  return (
    <>
      {screen === 'home' && <HomePage onOpenLock={() => setScreen('lock')} />}
      {screen === 'lock' && <LockScreen onUnlock={(r) => { setRole(r); setScreen('dashboard') }} />}
      {screen === 'dashboard' && <Dashboard role={role} onLogout={() => setScreen('home')} />}
    </>
  )
}
