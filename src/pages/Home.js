import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { RingLoader } from 'react-spinners'
import { Link } from 'react-router-dom'

const GET_COUNTRIES = gql`
  {
    countries {
      name
      code
      emoji
      currency
      continent {
        name
        code
      }
    }
  }
`

export default function Home() {
  const { data, error, loading } = useQuery(GET_COUNTRIES)
  return (
    <div>
      {loading && (
        <RingLoader
          color='rgba(54, 60, 214, 0.67)'
          size={200}
          speedMultiplier={2}
        />
      )}
      {error && <h1>{<pre>{JSON.stringify(error, null, 2)}</pre>}</h1>}
      {data && (
        <>
          {data.countries.map((item) => (
            <div key={item.code}>
              <h1>{item.name}</h1>
              <h1>{item.emoji}</h1>
              <Link to={`/${item.code}`}>Details</Link>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
