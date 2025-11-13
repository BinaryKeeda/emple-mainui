// helpers/control.js
import axios from 'axios';
import devtools from 'devtools-detect';
import { BASE_URL } from '../../../lib/config';

function getColor(count) {
  if (count <= 1) return 'green';
  if (count <= 2) return 'yellow';
  return 'red';
}

export const handleVisibilityChange = ({ setWarningModal }) => {
  setWarningModal(prev => {
    const newCount = prev.count + 1;
    return {
      open: true,
      count: newCount,
      color: getColor(newCount),
      warning: 'You switched tabs or minimized the screen!'
    };
  });
};

export const handleFullScreenChange = ({setWarningModal}) => {
    setWarningModal(prev => {
        const newCount = prev.count + 1;
        return {
            open:true,  
            count: newCount,
            color: getColor(newCount),
            warning: 'Exiting full screen is not allowed during test!'
        }
    })
}
export const switchToFullScreen = () => {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen(); // Safari
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen(); // IE11
        }
}

export const isFullScreen = () => {
   return ( document.fullscreenElement || // Standard
    document.webkitFullscreenElement || // Safari
    document.mozFullScreenElement || // Firefox
    document.msFullscreenElement // IE/Edge
    != null)
};

export const detectDevTools = (setWarningModal) => {
  if (devtools.isOpen) {
    setWarningModal(prev => ({
      open: true,
      warning: 'Developer tools detected. Your test may be auto-submitted.',
      color: 'red',
      count: prev.count + 1
    }))
    // Optional: auto-submit or mark UFM here
  }
}

