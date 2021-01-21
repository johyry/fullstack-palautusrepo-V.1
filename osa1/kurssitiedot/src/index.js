import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Parts parts={course.parts} />
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{ props.name }</h1>
    </div>
  )
}

const Parts = (props) => {
  let total = 0
  props.parts.forEach(part => {
    total += part.exercises
  })
  return (
    <div>
      <p>{props.parts[0].name}  {props.parts[0].exercises}</p>
      <p>{props.parts[1].name}  {props.parts[1].exercises}</p>
      <p>{props.parts[2].name}  {props.parts[2].exercises}</p>
      <p>Number of exercises {total}</p>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))