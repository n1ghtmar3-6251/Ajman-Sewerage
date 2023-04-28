import {
  Notification,
  NotificationContainer,
  NotificationMainContainer,
} from "./notification.styled";

const Notifications = () => {
  return (
    <>
      <NotificationMainContainer>
        <h1>Notifications</h1>
        <p>View all your notifications, be informed and / or take action</p>
        <p>
          <b>2 New Notifications</b>
        </p>
        <NotificationContainer>
          <Notification>
            Your ‘Move in’ request (344523112) for the Sewerage Number 1461364
            has been approved <p>2 hours ago</p>
          </Notification>
          <Notification>
            Your ‘Move in’ request (344523112) for the Sewerage Number 1461364
            has been approved <p>4 hours ago</p>
          </Notification>
          <Notification>
            Your ‘Move in’ request (344523112) for the Sewerage Number 1461364
            has been approved <p>2 hours ago</p>
          </Notification>
          <Notification>
            Your ‘Move in’ request (344523112) for the Sewerage Number 1461364
            has been approved <p>10.45 PM, 15/05/2022</p>
          </Notification>
          <Notification>
            Your ‘Move in’ request (344523112) for the Sewerage Number 1461364
            has been approved <p>10.45 PM, 15/05/2022</p>
          </Notification>
          <Notification>
            Your ‘Move in’ request (344523112) for the Sewerage Number 1461364
            has been approved <p>10.45 PM, 15/05/2022</p>
          </Notification>
          <Notification>
            Your ‘Move in’ request (344523112) for the Sewerage Number 1461364
            has been approved <p>10.45 PM, 15/05/2022</p>
          </Notification>
          <Notification>
            Your ‘Move in’ request (344523112) for the Sewerage Number 1461364
            has been approved <p>10.45 PM, 15/05/2022</p>
          </Notification>
          <Notification>
            Your ‘Move in’ request (344523112) for the Sewerage Number 1461364
            has been approved <p>10.45 PM, 15/05/2022</p>
          </Notification>
        </NotificationContainer>
      </NotificationMainContainer>
    </>
  );
};

export default Notifications;
