
export const CalendarEvent = ({ event }) => {

  const { title, user } = event

  return (
    <>
      <strong>{ title }</strong>
      <br />
      <p>- { user.name }</p>
    </>
  )
}
