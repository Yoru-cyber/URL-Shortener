import server from '..'
import { expect, test } from 'vitest'
import IShortenedURL from '../interfaces/IShortenedList'

test('ShortenedList', async () => {
  const response = await server.inject({
    method: 'GET',
    url: '/ShortenedList'
  })
  const data = JSON.parse(response.body)
  expect.soft(data).toBeInstanceOf(Array<IShortenedURL>)
})
