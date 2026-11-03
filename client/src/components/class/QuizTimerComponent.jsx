import React, { Component } from 'react';
import { Clock, AlertTriangle, Pause, Play } from 'lucide-react';

/**
 * Point 10 Requirement: React Class Component
 * Manages countdown timer state, intervals, and lifecycle events for the Quiz Application (Point 7)
 */
class QuizTimerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: props.initialSeconds || 120,
      isPaused: false,
      isWarning: false
    };
    this.timerId = null;
  }

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate(prevProps, prevState) {
    // Check if time ran out
    if (prevState.timeLeft > 0 && this.state.timeLeft === 0) {
      this.clearTimer();
      if (this.props.onTimeUp) {
        this.props.onTimeUp();
      }
    }

    // Trigger warning state under 30 seconds
    if (prevState.timeLeft > 30 && this.state.timeLeft <= 30 && !this.state.isWarning) {
      this.setState({ isWarning: true });
    }
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  startTimer = () => {
    if (this.timerId) clearInterval(this.timerId);
    this.timerId = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.timeLeft <= 1) {
          clearInterval(this.timerId);
          return { timeLeft: 0 };
        }
        return { timeLeft: prevState.timeLeft - 1 };
      });
    }, 1000);
  };

  clearTimer = () => {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  };

  togglePause = () => {
    if (this.state.isPaused) {
      this.startTimer();
      this.setState({ isPaused: false });
    } else {
      this.clearTimer();
      this.setState({ isPaused: true });
    }
  };

  formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  render() {
    const { timeLeft, isWarning, isPaused } = this.state;
    const { totalSeconds = 120 } = this.props;
    const progressPercent = Math.max(0, Math.min(100, (timeLeft / totalSeconds) * 100));

    return (
      <div
        className={`border-2 border-black dark:border-black p-4 transition-all duration-200 select-none ${
          isWarning
            ? 'bg-red-500 text-white shadow-retro-pink animate-pulse'
            : 'bg-cyber-yellow text-black shadow-retro'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className={`w-5 h-5 ${isWarning ? 'animate-bounce' : ''}`} />
            <span className="font-mono text-xs font-bold uppercase tracking-wider">
              {isWarning ? 'CRITICAL TIME' : 'ASSESSMENT TIMER'}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={this.togglePause}
              type="button"
              className="p-1 border border-black bg-white/30 hover:bg-white/60 active:translate-y-0.5 text-xs font-mono font-bold"
              title={isPaused ? 'Resume Timer' : 'Pause Timer'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
            <span className="font-mono text-2xl font-black tracking-widest">
              {this.formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Retro Segmented Progress Bar */}
        <div className="mt-2 w-full h-2.5 bg-black/20 border border-black overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              isWarning ? 'bg-white' : 'bg-black'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {isPaused && (
          <p className="mt-1.5 text-[11px] font-mono text-center font-bold uppercase bg-black text-white py-0.5">
            [TIMER PAUSED]
          </p>
        )}
      </div>
    );
  }
}

export default QuizTimerComponent;
