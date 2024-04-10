
export class EventDto {
  constructor(title, start, end, notes, idUser, eventId) {
    this.title = title
    this.start = start
    this.end = end,
    this.notes = notes
    this.idUser = idUser
    this.eventId = eventId
  }

  static create(obj = {}) {
    const { title, start, end, notes, idUser, eventId } = obj
    let newStartDate = start
    let newEndDate = end

    if (!title && !start && !end && !notes) return ['Porfavor rellena los campos'];
    if (!title) return ['El titulo es obligatorio'];
    if (!start) return ['Fecha inicio es obligatorio'];
    if (!end) return ['Fecha fin es obligatorio'];
    if (!notes) return ['Notes es obligatorio'];

    if (start) {
      newStartDate = new Date( start )
      if ( newStartDate.toString() === 'Invalid Date' ) {
        return ['Start Date must be a valid Date']
      }
    }

    if (end) {
      newEndDate = new Date( end )
      if ( newEndDate.toString() === 'Invalid Date' ) {
        return ['End Date must be a valid Date']
      }
    }

    return [undefined, new EventDto(title, start, end, notes, idUser, eventId)]
  }
}
