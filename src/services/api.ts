import axios from 'axios'

import { parseCookies } from 'nookies'

const cookies = parseCookies()

console.log(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/`)

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_ENDPOINT}`,
  headers: {
    Authorization: `Bearer ${cookies['konahacustomer.token']}`,
  },
})
