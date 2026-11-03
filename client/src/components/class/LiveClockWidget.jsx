import React, { Component } from 'react';
import { Terminal, Activity, Wifi } from 'lucide-react';

/**
 * Point 10 Requirement: Secondary React Class Component
 * Manages institutional real-time clock, status heartbeat, and network telemetry
 */
class LiveClockWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: new Date().toLocaleTimeString(),
      pingMs: 24,
      systemStatus: 'ONLINE'
    };
    this.clockInterval = null;
    this.pingInterval = null;
  }

  componentDidMount() {
    this.clockInterval = setInterval(() => {
      this.setState({ currentTime: new Date().toLocaleTimeString() });
    }, 1000);

    this.pingInterval = setInterval(() => {
      // Small simulated ping fluctuation between 18ms and 36ms
      const randomPing = Math.floor(Math.random() * 18) + 18;
      this.setState({ pingMs: randomPing });
    }, 4000);
  }

  componentWillUnmount() {
    if (this.clockInterval) clearInterval(this.clockInterval);
    if (this.pingInterval) clearInterval(this.pingInterval);
  }

  render() {
    const { currentTime, pingMs, systemStatus } = this.state;

    return (
      <div className="flex items-center space-x-3 px-3 py-1.5 border-2 border-black dark:border-cyber-cyan bg-slate-100 dark:bg-cyber-darkSurface text-black dark:text-cyber-cyan font-mono text-xs shadow-retro-sm">
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-cyber-green animate-ping inline-block"></span>
          <span className="font-bold">{systemStatus}</span>
        </div>

        <span className="text-slate-400">|</span>

        <div className="flex items-center space-x-1">
          <Terminal className="w-3.5 h-3.5 text-cyber-yellow" />
          <span>{currentTime}</span>
        </div>

        <span className="text-slate-400">|</span>

        <div className="flex items-center space-x-1">
          <Wifi className="w-3.5 h-3.5 text-cyber-cyan" />
          <span>{pingMs}ms</span>
        </div>
      </div>
    );
  }
}

export default LiveClockWidget;
