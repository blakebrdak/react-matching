import "../css/Footer.css";
import Reset from "./Reset";

export default function Footer(props) {
  return (
    <div className="footer">
      <p>Moves: {props.moves}</p>
      <p>Low score: {props.lowScore}</p>
      <Reset reset={props.reset} />
    </div>
  );
}
