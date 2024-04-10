import { useState } from 'react';
import Modal from 'react-modal'
import { MdSave } from 'react-icons/md'
import { addHours, differenceInSeconds } from 'date-fns';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es'
import Swal from 'sweetalert2';
import { useMemo } from 'react';
import clsx from 'clsx';
import { useCalendarStore, useUiStore } from '../../hooks';
import { useEffect } from 'react';

registerLocale('es', es)

const customStyles = {
  content: {
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    // marginRight: '-50%',
    // transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

  const { isDateModalOpen, closeDateModal } = useUiStore()
  const { activeEvent, startSavingEvent } = useCalendarStore()


  const [ formSubmitted, setFormSubmitted ] = useState(false)

  const [ formValues, setFormValues ] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours( new Date(), 2 ),
  })

  const titleClass = useMemo(() => {
    if (!formSubmitted) return false

    return (formValues.title.length > 0)
      ? false
      : true

  }, [formValues.title, formSubmitted])

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({...activeEvent})
    }
  }, [activeEvent])

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const onDateChanged = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event
    })
  }

  const onCloseModal = () => {
    closeDateModal()
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setFormSubmitted(true)

    const difference = differenceInSeconds(formValues.end, formValues.start)
    if (isNaN(difference) || difference <= 0) {
      Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error')
      return;
    }

    if (formValues.title.length <= 0) return;
    // console.log(formValues)

    await startSavingEvent( formValues )
    //cerrar modal
    closeDateModal()
    setFormSubmitted(false)

  }

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1 className="text-4xl"> Nuevo evento </h1>
      <hr />
      <form className="container mt-5" onSubmit={ onSubmit }>

        <div className=" mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            className="input"
            selected={ formValues.start }
            onChange={ (event) => onDateChanged(event, 'start') }
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={ formValues.start }
            className="input"
            selected={ formValues.end }
            onChange={ (event) => onDateChanged(event, 'end') }
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={clsx('input', {'border-red-500': titleClass})}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            onChange={ onInputChange }
            value={ formValues.title }
          />
          <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="input"
            placeholder="Notas"
            rows="5"
            name="notes"
            onChange={ onInputChange }
            value={ formValues.notes }
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
          type="submit"
          className="flex items-center gap-1 border-solid border-[#169BE0] text-[#169be0] border-[1px] p-2 rounded-md"
        >
          <MdSave />
          <span> Guardar</span>
        </button>

      </form>

    </Modal>
  )
}
