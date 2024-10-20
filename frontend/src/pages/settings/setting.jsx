import { useContext } from "react";
import { ThemeContext } from "../context/theme-context";
import { ShopContext } from '../context/shop-context';

function Settings() {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const { changeCurrency } = useContext(ShopContext);
  
  return (
    <div className={`p-5 ${isDarkTheme ? "bg-dark text-light" : "bg-light text-dark"} my-4`}>
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          <span>Theme</span>
          <button 
            onClick={toggleTheme} 
            className="btn btn-sm rounded-pill" 
            style={{ backgroundColor: isDarkTheme ? "#6f42c1" : "#4e73df", color: "#fff" }} // Purple color
          >
            Switch to {isDarkTheme ? "Light" : "Dark"} Theme
          </button>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          <span>Currency</span>
          <select 
            className="form-select" 
            onChange={(e) => { changeCurrency(e.target.value); console.log(e.target.value); }}
            style={{ borderRadius: '20px' }} // Rounded select
          >
            <option value="naira">SELECT CURRENCY AS NAIRA IS DEFAULT</option>
            <option value="dollar">USD $</option>
            <option value="naira">NAIRA ₦</option>
            {/* <option value="">GBP £</option> */}
          </select>
        </li>
      </ul>
    </div>
  );
}

export default Settings;
