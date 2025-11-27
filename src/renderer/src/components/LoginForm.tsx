import React, { useState } from 'react'
import '../assets/login.css'
import { UserService } from '../../../service/user_service'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const LoginForm = (): React.JSX.Element => {
  // Login State
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Registration State
  const [regUsername, setRegUsername] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regConfirmPassword, setRegConfirmPassword] = useState('')

  // Dialog State
  const [open, setOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [title, setTitle] = useState('')

  const user_service = new UserService()
  const navigate = useNavigate();

  const handleClose = (): void => {
    setOpen(false)
    setErrorMessage('')
    setTitle('')
  }

  const showError = (message: string): void => {
    setErrorMessage(message)
    setOpen(true)
    setTitle('Error')
  }

  const showSuccess = (message: string): void => {
    setErrorMessage(message)
    setOpen(true)
    setTitle('Success')
  }

  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    try {
      console.log('Login attempt:', { email, password })
      await user_service.login(email, password).then(() => {
        navigate('/vault')
      })
    } catch (error: any) {
      const message = error?.message || (typeof error === 'string' ? error : JSON.stringify(error))
      showError(message)
    }
  }

  const handleRegister = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    if (regPassword !== regConfirmPassword) {
      showError("Passwords don't match")
      return
    }
    console.log('Register attempt:', { regUsername, regPassword })
    try {
      await user_service.register(regUsername, regPassword, regConfirmPassword).then(() => {
        showSuccess('User registered successfully')
      })
    } catch (error: any) {
      const message = error?.message || (typeof error === 'string' ? error : JSON.stringify(error))
      showError(message)
    }
  }

  return (
    <div className="login-container">
      <div className="auth-wrapper">
        {/* Registration Form (Left) */}
        <div className="login-card">
          <div className="login-header">
            <h2>Create Account</h2>
            <p>Sign up to get started</p>
          </div>

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="reg-username">Username</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="reg-username"
                  className="form-input"
                  placeholder="Choose a username"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reg-password">Password</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  id="reg-password"
                  className="form-input"
                  placeholder="Create a password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reg-confirm-password">Confirm Password</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  id="reg-confirm-password"
                  className="form-input"
                  placeholder="Confirm your password"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="login-button">
              Sign Up
            </button>
          </form>
        </div>

        {/* Login Form (Right) */}
        <div className="login-card">
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Please sign in to continue</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="email"
                  className="form-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  id="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="login-button">
              Sign In
            </button>
          </form>

          <div className="forgot-password">
            <a href="#">Forgot your password?</a>
          </div>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {errorMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default LoginForm
