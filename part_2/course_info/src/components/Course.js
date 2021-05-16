import React from 'react';

const Course = ({ course }) => {
    return (
      <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      </div>
    )
  }
  
  const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        <ul>
          {parts.map(part =>
          <Part key={part.id} details={part}/>)}
        </ul>
      </div>
    )
  }
  
  const Part = ({ details }) => {
    return (
      <li>{details.name} {details.exercises}</li>
    )
  }
  
  const Total = ({ parts }) => {
    const sum = parts.map(part => part.exercises)
    const totalSum = sum.reduce((accumulator, currentValue) => accumulator + currentValue)
    return ( 
      <div>
        <strong>total of {totalSum} exercises.</strong>
      </div>
  
    )
  }
  
  export default Course;