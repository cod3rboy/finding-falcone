import { useCurrentPage } from "../../Components/PageSwitch";
import "./index.css";

function Header() {
  const [, changePage] = useCurrentPage();
  return (
    <nav>
      <h1 className="brand">Finding Falcone!</h1>
      <ul>
        <li>
          <a
            href="#"
            className="button button-clear"
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent("link-reset"));
            }}
          >
            Reset
          </a>
        </li>
        <li>
          <a
            href="#"
            className="button button-clear"
            onClick={(e) => {
              e.preventDefault();
              changePage("home");
            }}
          >
            Home
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
