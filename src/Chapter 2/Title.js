import './Title.css';

function Title() {
  let count = 0;
  const onClick = () => {
    count++;
    console.log('clicked', count);
  };

  console.log('updated', count);
  return (
    <div className="main">
      <button className="adornment-button" onClick={onClick}>+</button>
      <h3 className="section">Hello World+{count}</h3>
    </div>
  );
}

export default Title;
