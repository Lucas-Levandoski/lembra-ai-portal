
// copied from codepen
// https://codepen.io/Diana-Moretti/pen/PoLrqZV

import './index.css';

export function BouncingThreeDotsLoading() {
  return (
    <div className="flex items-center w-14 h-7">
      <div className="loader">
        <div className="dot bg-blue-600"></div>
        <div className="dot bg-blue-600"></div>
        <div className="dot bg-blue-600"></div>
      </div>
    </div>
  )
}