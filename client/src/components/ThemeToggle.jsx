import { useDashboardContext } from '../pages/DashboardLayout';
import ThemeWrapper from '../assets/page-wrappers/ThemeToggle';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

const ThemeToggle = () => {
  const { isDarkTheme, toggleTheme } = useDashboardContext();

  return (
    <ThemeWrapper onClick={toggleTheme}>
      {isDarkTheme ? (
        <BsFillMoonFill />
      ) : (
        <BsFillSunFill className="toggle-icon" />
      )}
    </ThemeWrapper>
  );
};

export default ThemeToggle;
