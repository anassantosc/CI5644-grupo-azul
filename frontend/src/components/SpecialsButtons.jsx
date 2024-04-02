import { Button } from '@mui/material';
import images from '../utils/constants/images';
import styles from '../../styles/SpecialsButtons.module.css';
//import { signIn } from 'next-auth/client';

export default function SpecialsButtons() {
  return (
    <div className={styles.container}>
      <Button variant="contained" className={styles.google} >
        <img src={images.G} alt="Google Logo" className={styles.googleLogo} />
        Iniciar sesión con Google
      </Button>
      <Button variant="contained" className={styles.facebook} >
        Iniciar sesión con Facebook
      </Button>
    </div>
  )
}
