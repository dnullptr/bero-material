import { Ticket } from './Ticket'

export interface User {
  id?: string
  fullName?: string
  username?: string
  email?: string
  tickets?: Ticket[]
  phone?: string
  password?: string
}
