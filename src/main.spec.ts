import { main } from "./main"

test('should log hello world', () => {
  console.log = jest.fn()
  main()
  expect(console.log).toHaveBeenCalledWith('hello world')
})
