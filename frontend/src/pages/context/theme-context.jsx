import { createContext, useState } from "react";
import PropTypes from "prop-types";

// Create the context
export const ThemeContext = createContext();

export const  ThemeProvider=({ children })=> {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };
const content={ isDarkTheme, toggleTheme }
  return (
    <ThemeContext.Provider value={content}>
      {children}
    </ThemeContext.Provider>
    );
    
    
}

// Define PropTypes for the component
ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired // Validate children prop
};
// export function useTheme() {  useContext(ThemeContext); }



