export interface Ticket {
  title: string
  status: Statuses
  ticket_id: number
}

enum Statuses {
  Open = 1,
  Closed = 2,
  InProgress = 3,
}
