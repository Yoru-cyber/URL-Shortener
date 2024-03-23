import type { FormEvent } from 'react'
import { useState } from 'react'

export default function Form () {
  const [shortenedURL, setShortenedURL] = useState('')
  async function handleSubmit (e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const data = formData.get('url')

    try {
      await fetch('http://localhost:3000/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          originalURL: data
        })
      })
        .then(async (response) => await response.json())
        .then(async (data) => {
          setShortenedURL(data.shortenedURL)
        })
    } catch (err) {
      alert('Something went wrong')
      console.log(err)
    }
  }

  return (
    <>
      <form
        id='form'
        method='GET'
        onSubmit={handleSubmit}
        className='flex flex-col items-center justify-center gap-4'
      >
        <label>So here it goes your URL: </label>
        <input
          type='text'
          name='url'
          className='rounded-lg max-w-96'
          style={{ color: 'black' }}
        />
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
        >
          Submit
        </button>
      </form>
      <p className='mt-5'>This is what you get in return: </p>
      {shortenedURL ? <p>{shortenedURL}</p> : <p>No URL defined</p>}
    </>
  )
}
