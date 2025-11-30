import { HashRouter, Routes, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Vault from './components/Vault'
import Generator from './components/Generator'

function App(): React.JSX.Element {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/vault" element={<Vault />} />
        <Route path="/generator" element={<Generator />} />
      </Routes>
    </HashRouter>
  )
}

export default App
