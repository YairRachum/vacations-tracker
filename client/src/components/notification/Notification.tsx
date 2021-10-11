import { FC, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { ActionType } from '../../redux/ActionType';
import { VscBellDot } from 'react-icons/vsc'
import Aos from 'aos';
import "aos/dist/aos.css"



const Notification: FC<any> = ({ message, type }) => {
  const containerEl = document.getElementById('notification-root');
  const [notificationMsg, setNotificationMsg] = useState('');
  const [notificationClass, setNotificationClass] = useState('notification mb-2');
  const dispatch = useDispatch();
  const notificationEl = useRef<HTMLDivElement>(null);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  // Add class to element based on type
  const addTypeClass = () => {
    if (type === 'success') {
      setNotificationClass('notification mb-2 is-primary');
    }
    if (type === 'danger') {
      setNotificationClass('notification mb-2 is-danger');
    }
    if (type === 'warning') {
      setNotificationClass('notification mb-2 is-warning');
    }
  }
  useEffect(() => {
    Aos.init({ duration: 1000 })

  }, [])



  // Update notification when message changes
  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      if (notificationEl.current) {
        notificationEl.current.style.opacity = '0';
      }
      setTimeout(() => {
        setNotificationMsg(message);
        addTypeClass();
        setTimeout(() => {
          if (notificationEl.current) {
            notificationEl.current.style.opacity = '1';
            timeout.current = setTimeout(() => {
              removeNotification();
            }, 5000);
          }
        }, 20);
      }, 300);
    } else {
      setNotificationMsg(message);
      addTypeClass();
      setTimeout(() => {
        if (notificationEl.current) {
          notificationEl.current.style.opacity = '1';
          timeout.current = setTimeout(() => {
            removeNotification();
          }, 5000);
        }
      }, 20);
    }
    // eslint-disable-next-line
  }, [message]);

  // Remove notification
  const removeNotification = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    if (notificationEl.current) {
      notificationEl.current.style.opacity = '0';
    }
    setTimeout(() => {
      dispatch({ type: ActionType.SendNotification, payload: { message: '', type: 'success' } });
    }, 300);
  }



  const output = (
    <div className="animate__animated animate__zoomInDown">
      <div className={notificationClass} ref={notificationEl}>
        <VscBellDot size="1.5em" />
        <button className="delete" onClick={removeNotification}></button>
        {notificationMsg}

      </div>
    </div>

  );

  return containerEl ? ReactDOM.createPortal(output, containerEl) : null;
}

export default Notification;