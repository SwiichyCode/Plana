interface ProjectLogoProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ProjectLogo = ({ name, size = 'md' }: ProjectLogoProps) => {
  const generateGradient = (projectName: string) => {
    const hash = projectName.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);

    const hue = Math.abs(hash % 360);
    const startColor = `hsl(${hue}, 65%, 40%)`;
    const endColor = `hsl(${hue}, 65%, 60%)`;

    return `linear-gradient(to bottom, ${startColor}, ${endColor})`;
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-xl',
    lg: 'w-16 h-16 text-2xl',
  };

  const firstLetter = name.charAt(0).toUpperCase();
  const gradient = generateGradient(name);

  return (
    <div
      className={`flex items-center justify-center rounded-md font-semibold text-white ${sizeClasses[size]}`}
      style={{ background: gradient }}
      aria-label={`Logo for ${name}`}
    >
      {firstLetter}
    </div>
  );
};
