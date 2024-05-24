import { useState, useContext } from 'react'
import { UserContext } from '../context/userContext'

const Login = () => {
  // local state
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  //context state
  const { login, loading, error } = useContext(UserContext)

  // functions
  const handleSubmit = async (e) => {
    e.preventDefault()
    await login({ username, password })
  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-primary'>
      <div className='bg-white p-8 rounded shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='username' className='block text-gray-700 mb-2'>
              Nom utilisateur
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type='text'
              className=' text-black w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500'
              placeholder='Enter your username'
            />
          </div>
          <div className='mb-6'>
            <label htmlFor='password' className='block text-gray-700 mb-2'>
              Mot de Passe
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              className=' text-black w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500'
              placeholder='Enter your password'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-cyan-700 text-white py-2 rounded hover:opacity-75'
          >
            Login
          </button>
          {error && <h1 className='text-red-500'>{error}</h1>}
        </form>
      </div>
    </div>
  )
}
export default Login
