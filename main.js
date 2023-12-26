const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App/>)

function Counter(props) {
  return (
    <div className='counter'>
      <button className='btn' onClick={() => props.hdlUpdate(props.item.id, -1)}> - </button>
      <h3>{props.item.number}</h3>
      <button className='btn' onClick={() => props.hdlUpdate(props.item.id, 1)}> + </button>
      <button className='btn' onClick={() => props.hdlUpdate(props.item.id, -props.item.number)}> C </button>
      <button className='btn' onClick={() => props.hdlRemove(props.item.id)}> X </button>
    </div>
  )
}

function SumInfo(props) {
  const sum = props.counters.reduce((acc, counter) => acc + counter.number, 0);

  return (
    <div className='suminfo'>
      <h1 style={{ color: props.color, fontSize: '50px' }}>Sum = {sum}</h1>
    </div>
  );
}

function App() {
  const [counters, setCounters] = React.useState([{ id: 1, number: 5 }]);

  const hdlUpdate = (id, num) => {
    setCounters((prevCounters) => {
      return prevCounters.map((counter) => {
        if (counter.id === id) {
          let newNumber = counter.number + num;
          newNumber = Math.max(newNumber, 0);
          return { ...counter, number: newNumber };
        }
        return counter;
      });
    });
  };

  const hdlAddCounter = () => {
    let newId = counters.length === 0 ? 1 : counters.at(-1).id + 1;
    const cloneCounters = [...counters];
    cloneCounters.push({ id: newId, number: 0 });
    setCounters(cloneCounters);
  };

  const hdlRemoveCounter = (id) => {
    setCounters((prevCounters) => prevCounters.filter((counter) => counter.id !== id));
  };

  return (
    <>
      <h1 className='text-center hh1'>Codecamp Academy 01</h1>
      <button className='text-center add-counter-button' onClick={hdlAddCounter}>
        Add Counter
      </button>
      <SumInfo color='red' size='big' counters={counters} />

      {counters.map((el) => (
        <Counter key={el.id} item={el} hdlUpdate={hdlUpdate} hdlRemove={hdlRemoveCounter} />
      ))}
    </>
  );
}
