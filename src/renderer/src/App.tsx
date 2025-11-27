import { HashRouter, Routes, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Vault from './components/Vault'

function App(): React.JSX.Element {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/vault" element={<Vault />} />
      </Routes>
    </HashRouter>
  )
}

export default App
