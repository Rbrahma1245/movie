const Button = ({ handleClick, innerText }) => {
  return <button onClick={handleClick}>{innerText}</button>;
};

export default Button;
