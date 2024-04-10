import { FaTrashAlt } from "react-icons/fa"
import { useCalendarStore, useUiStore } from "../../hooks"
import clsx from "clsx"

export const FabDelete = () => {

  const { startDeletingEvent, hasEventSelected } = useCalendarStore()
  const { hasEventModal } = useUiStore()

  const handleDelete = () => {
    startDeletingEvent()
  }

  return (
    <button
      className={clsx(
        "bg-red-500 rounded-[50%] w-10 h-10 grid place-content-center absolute left-5 bottom-5 z-10 text-white text-2xl hover:border-[2px] hover:border-red-400",
        { "hidden": !hasEventSelected },
        { "hidden": hasEventModal }
      )}
      onClick={handleDelete}
    >
      <FaTrashAlt className="text-[16px]" />
    </button>
  )
}
