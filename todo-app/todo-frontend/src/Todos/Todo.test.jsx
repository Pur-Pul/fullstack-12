import { render, screen } from '@testing-library/react'
import { expect } from 'vitest'
import Todo from './Todo'

test("renders todo text", () => {
    render(<Todo onClickDelete={() => {}} onClickComplete={() => {}} todo={{text: "test todo", done: false}}/>)
    const element = screen.getByText('test todo')
	expect(element).toBeDefined()
})