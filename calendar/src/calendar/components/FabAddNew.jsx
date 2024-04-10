import { addHours } from "date-fns"
import { useCalendarStore, useUiStore } from "../../hooks"

export const FabAddNew = () => {

  const { openDateModal } = useUiStore()
  const { setActiveEvent } = useCalendarStore()

  const handleClickNew = () => {
    setActiveEvent({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: '#f2f2f2',
      user: {
        _id: '123',
        name: 'Luisinho'
      }
    })
    openDateModal()
  }

  return (
    <button
      className="bg-blue-500 rounded-[50%] w-10 h-10 grid place-content-center absolute right-5 bottom-5 text-white text-2xl"
      onClick={handleClickNew}
    >
      +
    </button>
  )
}
