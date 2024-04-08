import { Button } from '@mui/material';
import images from '../utils/constants/images';
import styles from '../../styles/SpecialsButtons.module.css';


export default function SpecialsButtons() {

  const facebookAuthUrl = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/facebook`;
  const googleAuthUrl = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`;

  const handleAuthRedirect = (url) => {
    window.location.href = url;
  }

  return (
    <div className={styles.container}>
      <Button 
        variant="contained" 
        className={styles.google} 
        onClick={() => handleAuthRedirect(googleAuthUrl)}
      >
        <img src={images.G} alt="Google Logo" className={styles.googleLogo} />
        Iniciar sesión con Google
      </Button>
      <Button 
        variant="contained" 
        className={styles.facebook}
        onClick={() => handleAuthRedirect(facebookAuthUrl)} 
      >
        Iniciar sesión con Facebook
      </Button>
    </div>
  )
}
