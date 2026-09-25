import { useState } from 'react'
import LoanApplicationForm from './components/LoanApplicationForm'

function App() {
  const [isFormOpen, setIsFormOpen] = useState(true)

  const handleClose = () => {
    setIsFormOpen(false)
  }

  const handleReopen = () => {
    setIsFormOpen(true)
  }

  if (!isFormOpen) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8fafc',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      }}>
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '40px',
          textAlign: 'center',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
          maxWidth: '400px',
          width: '90%'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#0f172a',
            marginBottom: '8px',
            margin: '0 0 8px 0'
          }}>
            Form Closed
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#64748b',
            margin: '0 0 20px 0'
          }}>
            The loan application form has been closed.
          </p>
          <button
            onClick={handleReopen}
            style={{
              padding: '10px 24px',
              backgroundColor: '#1d5bea',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#1a4fd4'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#1d5bea'}
          >
            Open Application Form
          </button>
        </div>
      </div>
    )
  }

  return <LoanApplicationForm onClose={handleClose} />
}

export default App
