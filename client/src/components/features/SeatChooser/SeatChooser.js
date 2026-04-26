import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Progress, Alert } from 'reactstrap';
import { getSeats, loadSeatsRequest, loadSeats, getRequests } from '../../../redux/seatsRedux';
import io from "socket.io-client";
import './SeatChooser.scss';

const SeatChooser = ({ chosenDay, chosenSeat, updateSeat }) => {
  const dispatch = useDispatch();
  const seats = useSelector(getSeats);
  const requests = useSelector(getRequests);

  useEffect(() => {
    // const socket = io(process.env.NODE_ENV === 'production' ? '' : 'ws://localhost:8000', { transports: ['websocket'] })
    const socket = io("http://localhost:8000");
    console.log("Socket creating...");

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("test", (msg) => {
      console.log("FROM SERVER:", msg);
    });

    socket.on("seatsUpdated", (data) => {
      console.log("UPDATED SEATS:", data);
      dispatch(loadSeats(data));
    });

    socket.on("connect_error", (err) => {
      console.log("Socket error:", err.message);
    });

    return () => socket.disconnect();
  }, );
  
  // useEffect(() => {
  //   dispatch(loadSeatsRequest());
  // }, [dispatch])
  // useEffect(() => {
  //   dispatch(loadSeatsRequest());

  //   const interval = setInterval(() => {
  //     dispatch(loadSeatsRequest());
  //   }, 120000);

  //   return () => clearInterval(interval);
  // }, [dispatch, chosenDay]);
  useEffect(() => {
    dispatch(loadSeatsRequest());
  }, [dispatch, chosenDay]);

  const isTaken = (seatId) => {
    return (seats.some(item => (item.seat === seatId && item.day === chosenDay)));
  }

  const prepareSeat = (seatId) => {
    if(seatId === chosenSeat) return <Button key={seatId} className="seats__seat" color="primary">{seatId}</Button>;
    else if(isTaken(seatId)) return <Button key={seatId} className="seats__seat" disabled color="secondary">{seatId}</Button>;
    else return <Button key={seatId} color="primary" className="seats__seat" outline onClick={(e) => updateSeat(e, seatId)}>{seatId}</Button>;
  }

  const takenSeats = seats.filter(item => item.day === chosenDay).length;
  const totalSeats = 50;
  const freeSeats = totalSeats - takenSeats;

  return (
    <div>
      <h3>Pick a seat</h3>
      <div className="mb-4">
        <small id="pickHelp" className="form-text text-muted ms-2"><Button color="secondary" /> – seat is already taken</small>
        <small id="pickHelpTwo" className="form-text text-muted ms-2"><Button outline color="primary" /> – it's empty</small>
      </div>
      { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].success) && (
        <>
          <div className="seats">
            {[...Array(50)].map((x, i) => prepareSeat(i+1))}
          </div>
          <p className="mt-3">
            Free seats: {freeSeats}/{totalSeats}
          </p>
        </>
      )}
      { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].pending) && <Progress animated color="primary" value={50} /> }
      { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].error) && <Alert color="warning">Couldn't load seats...</Alert> }
    </div>
  )
}

export default SeatChooser;