import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Sprint 7 Challenge Learner Tests', () => {
  /*
  👉 TASK 1 - Unit Testing of sum function at the bottom of this module

  Test the following. You can create separate tests or a single test with multiple assertions.

    [1] sum() // throws an error 'pass valid numbers'
    [2] sum(2, 'seven') // throws an error 'pass valid numbers'
    [3] sum(1, 3) // returns 4
    [4] sum('1', 2) // returns 3
    [5] sum('10', '3') // returns 13
  */

  /*
  👉 TASK 2 - Integration Testing of HelloWorld component at the bottom of this module

  Test the <HelloWorld /> component found below...
    - using `screen.queryByText` to capture nodes
    - using `toBeInTheDocument` to assert their existence in the DOM

    [1] renders a link that reads "Home"
    [2] renders a link that reads "About"
    [3] renders a link that reads "Blog"
    [4] renders a text that reads "The Truth"
    [5] renders a text that reads "JavaScript is pretty awesome"
    [6] renders a text that includes "javaScript is pretty" (use exact = false)
    */
    test('you can comment out this test', () => {
      expect(false).toBe(false)
  })
})

function sum(a, b) {
  a = Number(a)
  b = Number(b)
  if (isNaN(a) || isNaN(b)) {
    throw new Error('pass valid numbers')
  }
  return a + b
}

describe('Testing of sum function', () => {
  test('throws an error "pass valid numbers"', () => {
    expect(() => sum()).toThrowError(Error)
    expect(() => sum(2,'seven')).toThrowError(Error)
  })
  test('returns 4', () => {
    let result = sum(1, 3)
    expect(result).toBe(4)
  })
  test('returns 3', () => {
    let result = sum('1', 2)
    expect(result).toBe(3)
  })
  test('returns 13', () => {
    let result = sum('10', '3')
    expect(result).toBe(13)
  })
})

function HelloWorld() {
  return (
    <div>
      <h1>Hello World Component</h1>
      <nav>
        <a href='#'>Home</a>
        <a href='#'>About</a>
        <a href='#'>Blog</a>
      </nav>
      <main>
        <section>
          <h2>The Truth</h2>
          <p>JavaScript is pretty awesome</p>
        </section>
      </main>
    </div>
  )
}

describe('Testing of HelloWorld component', () => {
    test('renders a link that says "Home"', () => {
      render(<HelloWorld />)
      expect(screen.queryByText('Home')).toBeVisible()
    })
    test('renders a link that says "About"', () => {
      render(<HelloWorld />)
      expect(screen.queryByText('About')).toBeVisible()
    })
    test('renders a link that says "Blog"', () => {
      render(<HelloWorld />)
      expect(screen.queryByText('Blog')).toBeVisible()
    })
    test('renders a text that reads "The Truth"', () => {
      render(<HelloWorld />)
      expect(screen.queryByText('The Truth')).toBeVisible()
    })
    test('renders a text that reads "JavaScript is pretty awesome"', () => {
      render(<HelloWorld />)
      expect(screen.queryByText('JavaScript is pretty awesome')).toBeVisible()
    })
    test('renders a text that includes "javaScript is pretty"', () => {
      render(<HelloWorld />)
      expect(screen.queryByText(/javaScript is pretty/i)).toBeVisible()
    })
  })
