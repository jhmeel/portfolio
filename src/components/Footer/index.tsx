import Socials from '../Socials';
import { memo } from 'react';
import './style.scss'
import { Format } from '../../Types';
function Footer(): React.ReactElement {
  const year: number = new Date().getFullYear();

  return (
    <div className="footer">
      <Socials />
      <span className="footer-copyright">
        &copy; {year} {Format.fullname}
      </span>
    </div>
  );
}

export default memo(Footer);


