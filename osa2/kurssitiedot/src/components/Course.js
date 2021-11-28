import React from 'react'

const Course = ({course}) => {
    return (
      <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </>
    )
  }
  
  const Header = (props) => {
    return (
      <>
        <h2>{props.course}</h2>
      </>
    )
  }
  
  const Content = (props) => {
    return (
      <>
        {props.parts.map(part => <Part key={part.id} part={part} />)}
      </>
    )
  }
  
  const Part = (props) => {
    return (
      <>
        <p>
          {props.part.name} {props.part.exercises}
        </p>
      </>
    )
  }
  
  const Total = (props) => {
    let sum = props.parts.reduce(
      (sum, part) => sum + part.exercises, 0)
    return (
      <>
        <b>total of {sum} excersises</b>
      </>
    )
  }

  export default Course