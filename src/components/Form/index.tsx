import './style.scss'

interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

interface HeaderProps extends BaseProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
}

export function Header(props: HeaderProps): React.ReactElement {
  const { title, subtitle, children } = props;

  return (
    <div className="custom-header">
      <h1 className="custom-header-title">{title}</h1>
      {subtitle && <p className="custom-header-subtitle">{subtitle}</p>}
      {children}
    </div>
  );
}

export function H1(props: BaseProps): React.ReactElement {
  const {children } = props;

  return <h1 className='custom-h1'>{children}</h1>;
}

export function H2(props: BaseProps): React.ReactElement {
  const {children } = props;

  return <h2 className='custom-h2'>{children}</h2>;
}

export function H3(props: BaseProps): React.ReactElement {
  const {children } = props;

  return <h3 className='custom-h3'>{children}</h3>;
}

