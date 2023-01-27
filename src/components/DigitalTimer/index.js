// Write your code here

import {Component} from 'react'

import './index.css'

const stateInistall = {
  isTimeRun: false,
  timeSeconds: 0,
  timeMinutes: 25,
}

class DigitalTimer extends Component {
  state = stateInistall

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  onDecrementTimer = () => {
    const {timeMinutes} = this.state

    if (timeMinutes > 1) {
      this.setState(prevState => ({
        timeMinutes: prevState.timeMinutes - 1,
      }))
    }
  }

  onIncrementTimer = () =>
    this.setState(prevState => ({
      timeMinutes: prevState.timeMinutes + 1,
    }))

  clearTimerInterval = () => clearInterval(this.intervalId)

  renderTimerControl = () => {
    const {timeSeconds} = this.state

    const disabledBtn = timeSeconds > 0

    return {disabledBtn}
  }

  renderControlTime = () => {
    const {isTimeRun} = this.state

    const startAndPushImg = isTimeRun
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png '

    const pushAndStartText = isTimeRun ? 'pause icon' : 'play icon'

    return {startAndPushImg, pushAndStartText}
  }

  onRestartTimer = () => {
    this.clearTimerInterval()

    this.setState(stateInistall)
  }

  incrementTimeInSeconds = () => {
    const {timeSeconds, timeMinutes} = this.state
    const isTimerCompleted = timeSeconds === timeMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimeRun: true})
    } else {
      this.setState(prevState => ({
        timeSeconds: prevState.timeSeconds + 1,
      }))
    }
  }

  onPushAndStartClick = () => {
    const {timeSeconds, timeMinutes, isTimeRun} = this.state

    const CompletedTimer = timeSeconds === timeMinutes * 60

    if (CompletedTimer) {
      this.setState({timeSeconds: 0})
    }
    if (isTimeRun) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeInSeconds, 1000)
    }
    this.setState(prevState => ({isTimeRun: !prevState.isTimeRun}))
  }

  getSecondsTimeFormat = () => {
    const {timeSeconds, timeMinutes} = this.state

    const totalRemSeconds = timeMinutes * 60 - timeSeconds

    const minutes = Math.floor(totalRemSeconds / 60)
    const seconds = Math.floor(totalRemSeconds % 60)

    const stringMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringMinutes}:${stringSeconds}`
  }

  render() {
    const {isTimeRun, timeMinutes} = this.state

    const {startAndPushImg, pushAndStartText} = this.renderControlTime()

    const {disabledBtn} = this.renderTimerControl()

    const pauseAndStartBtn = isTimeRun ? 'Pause' : 'Start'

    const runText = isTimeRun ? 'Running' : 'Paused'

    return (
      <div className="bg-container">
        <div>
          <h1 className="digital-heading">Digital Timer</h1>
          <div className="digital-timer-container">
            <div className="timer-img-container">
              <div className="elapsed-time-container">
                <h1 className="timer-heading">{this.getSecondsTimeFormat()}</h1>
                <p className="running-para">{runText}</p>
              </div>
            </div>
            <div>
              <div className="start-restart-container">
                <div className="play-icon-container">
                  <button
                    className="start-btn"
                    type="button"
                    onClick={this.onPushAndStartClick}
                  >
                    <img
                      src={startAndPushImg}
                      alt={pushAndStartText}
                      className="play-img"
                    />
                    <p className="push-start-btn">{pauseAndStartBtn}</p>
                  </button>
                </div>
                <div className="reset-icon-container">
                  <button
                    className="reset-btn"
                    type="button"
                    onClick={this.onRestartTimer}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                      alt="reset icon"
                      className="reset-img"
                    />
                    <p className="restart-para">Reset</p>
                  </button>
                </div>
              </div>
              <div className="set-timer-add-sub-container">
                <p className="set-limit-para">Set Timer Limit</p>
                <div className="plus-sub-num-container">
                  <button
                    type="button"
                    className="sub-btn"
                    disabled={disabledBtn}
                    onClick={this.onDecrementTimer}
                  >
                    -
                  </button>
                  <p className="score-btn" type="button">
                    {timeMinutes}
                  </p>
                  <button
                    type="button"
                    className="add-btn"
                    onClick={this.onIncrementTimer}
                    disabled={disabledBtn}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
