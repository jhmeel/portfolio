import { Colors, contact, ContactType } from "../../Types";
import React, { memo } from "react";
import { IconBaseProps } from "react-icons";
import { FaLinkedinIn as LinkedinIcon } from "react-icons/fa";
import {
  IoLogoGithub as GithubIcon,
  IoLogoTwitter as TwitterIcon,
} from "react-icons/io";
import {
  SiBuymeacoffee as BuymeacoffeeIcon,
  SiHashnode as HashnodeIcon,
  SiGmail as MailIcon,
  SiYoutube as YoutubeIcon,
  SiGooglescholar as Googlescholar,
} from "react-icons/si";
import "./style.scss";

function SocialIcons(): React.ReactElement {
  return (
    <div className="social-icons-container">
      {React.Children.toArray(Object.entries(contact.links).map(resolveIcon))}
    </div>
  );
}

function resolveIcon(entry: Array<string>): React.ReactNode {
  const [type, url] = entry;
  const props: IconBaseProps = {
    className: "custom-social-icon",
    color: Colors[type],
  };

  let icon: any = null;
  switch (type) {
    case ContactType.linkedin:
      icon = <LinkedinIcon {...props} />;
      break;
    case ContactType.twitter:
      icon = <TwitterIcon {...props} />;
      break;
      case ContactType.hashnode:
      icon = <HashnodeIcon {...props} />;
      break;
    case ContactType.github:
      icon = <GithubIcon {...props} />;
      break;
    case ContactType.youtube:
      icon = <YoutubeIcon {...props} />;
      break;
    case ContactType.email:
      icon = <MailIcon {...props} />;
      break;
    case ContactType.buymeacoffee:
      icon = <BuymeacoffeeIcon {...props} />;
      break;
    case ContactType.googlescholar:
      icon = <Googlescholar {...props} />;
      break;
    default:
      break;
  }

  return (
    <a
      className="social-icon-link"
      href={url}
      aria-label={type}
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </a>
  );
}

export default memo(SocialIcons);
