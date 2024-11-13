const Hello = (props) => {
  return (
    <div>
      <p>

        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

const App = () => {

  const name = 'Deepanjali'
  const age = 22

  return (
    <div>
      <h1>Greetings</h1>

      <Hello name='Dikshya' age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  )
}
export default App