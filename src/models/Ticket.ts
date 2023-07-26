export interface Ticket {
  title: string
  status: Status
  ticket_id: number
}

enum Status {
  Open = 1,
  Closed = 2,
  InProgress = 3,
}
