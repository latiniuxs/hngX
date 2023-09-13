import facebook from '../assets/fa-brands_facebook-square.svg';
import instagram from '../assets/fa-brands_instagram.svg';
import twitter from '../assets/fa-brands_twitter.svg';
import youtube from '../assets/fa-brands_youtube.svg'

export const Footer = () => {
  return (
    <div className='flex flex-col '>
    <div className='flex justify-center align-middle text-center space-x-7 '>
    <img src={facebook} alt="facebook icon"/>
    <img src={instagram} alt="instagram icon"/>
    <img src={twitter} alt="twitter icon"/>
    <img src={youtube} alt="youtube icon"/>
    </div>
    <div className='flex justify-center align-middle text-center my-5'>
    <p>Conditions of Use</p>
    <p className='mx-10 '>Privacy & Policy</p>
    <p>Press Room</p>
    </div>
    <div className='flex justify-center align-middle text-center mb-20 '>
    <p>© {new Date().getFullYear()} MovieBox by Hiphotler</p>
    </div>
    </div>
  )
}
