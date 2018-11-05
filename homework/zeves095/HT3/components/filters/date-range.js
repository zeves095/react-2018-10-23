import React from 'react'
import { connect } from 'react-redux'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import { changeCalendarRangeActionCreator } from '../../ac'

export class Example extends React.Component {
  handleDayClick = (day) => {
    this.props.changeRange(day)
  }
  handleResetClick = () => {
    this.props.changeRange()
  }

  render() {
    const { from, to, numberOfMonths } = this.props
    const modifiers = { start: from, end: to }

    return (
      <div className="RangeExample">
        <p>
          {!from && !to && 'Please select the first day.'}
          {from && !to && 'Please select the last day.'}
          {from &&
            to &&
            `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{' '}
          {from &&
            to && (
              <button className="link" onClick={this.handleResetClick}>
                Reset
              </button>
            )}
        </p>
        <DayPicker
          className="Selectable"
          numberOfMonths={numberOfMonths}
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
        />
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  numberOfMonths: store.filters.calendar.config.numberOfMonths,
  from: store.filters.calendar.from,
  to: store.filters.calendar.to
})
const mapDispatchToProps = {
  changeRange: changeCalendarRangeActionCreator
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Example)
