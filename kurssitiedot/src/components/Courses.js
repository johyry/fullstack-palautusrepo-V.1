import React from 'react'

const Courses = ({ courses }) => {

    return (
      <ul>
        {courses.map(course => 
            <li key={course.id}>
              <Header text={course.name} />
              <Content parts={course.parts} />
              <TotalExercises parts={course.parts} />
            </li>
          )}
        
      </ul>
      
    )
  }
  
  const Header = ({ text }) => <h1>{text}</h1>
  
  const Content = ({ parts }) => {
    return (
      <ul>
        {parts.map(part =>
            <Part key={part.id} part={part} />
          )}
      </ul>
    )
  }
  
  const Part = ({ part }) => {
    return (
      <li>{part.name} {part.exercises}</li>
    )
  }
  
  const TotalExercises = ({ parts }) => {
    return (
      <p>
        Total of {parts.reduce((acc, part) => acc + part.exercises, 0)} exercises
      </p>
    )
  }

export default Courses