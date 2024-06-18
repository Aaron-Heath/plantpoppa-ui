import { useNavigate } from 'react-router-dom'
import auth from '../../../utils/auth'
import GetStartedButton from '../../GetStartedButton'
import './home.css'

export default function Home() {
  const navigate = useNavigate();

  if(auth.loggedIn()) {
    navigate("/app")
  }
  
  
  return (
    <div>

      <div id="landing">
        <h1><span className='logo'>PlantPoppa</span></h1>
        <h3>Your plant care co-parent</h3>
        <div className='offwhite landing-text'>
          <span className="bold">Plant parenthood made easy.</span>
          <p> Never forget to water your plants again.</p>
        </div>
        <div id='button-div'>
        <GetStartedButton/>
        </div>
        <div id='login-referral'>
          <p className='offwhite bold'>Already have an account?</p>
          <a className='offwhite' href='/login'>Log In Here</a>
        </div>

      </div>
    </div>
  )
}
