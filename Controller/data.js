
let rooms = [
    { roomId: 1,seats: 20, amenities:'tv', pricePerHour: 100 },
    { roomId: 2,seats: 15, amenities:'fridge,tv', pricePerHour: 200 },
    { roomId: 3,seats: 20, amenities:'fridge,ac,tv', pricePerHour: 300 },
    { roomId: 4,seats: 20, amenities:'fridge,ac,tv,wifi', pricePerHour: 600 },
    { roomId: 5,seats: 5, amenities:'fridge,ac,tv,wifi,doublecot', pricePerHour: 800 },

   ];

let bookings = [
    { bookingId: 1, customerName: 'Alice', date: '2024-08-15', startTime: '09:00', endTime: '11:00', roomId: 1, bookingDate: '2024-08-01T10:00:00Z', status: 'Failed' },
    { bookingId: 2, customerName: 'Lakshmi', date: '2024-08-16', startTime: '11:00', endTime:'14:00', roomId: 2, bookingDate: '2024-08-02T12:00:00Z', status: 'Booked' },
    { bookingId: 1, customerName: 'Priya', date: '2024-08-17', startTime: '10:00', endTime: '12:00', roomId: 3, bookingDate: '2024-08-03T10:00:00Z', status: 'Failed' },
    { bookingId: 2, customerName: 'Arjun', date: '2024-08-18', startTime: '12:00', endTime: '14:00', roomId: 4, bookingDate: '2024-08-04T12:00:00Z', status: 'Booked' },
    { bookingId: 1, customerName: 'Ashwin', date: '2024-08-19', startTime: '08:00', endTime: '11:00', roomId: 5, bookingDate: '2024-08-05T10:00:00Z', status: 'Booked' },  
];

// Create a Room
export const createRooms = (req,res)=>{
    const {seats,amenities,pricePerHour} = req.body
    const newRoom = {
        roomId: rooms.length + 1,
                seats:seats,
                amenities:amenities,
                pricePerHour:pricePerHour,
    }
    rooms.push(newRoom);

    res.status(200).json({message:"Room Added Successfully!",newRoom})
}
export const getRooms = (req,res)=>{
    res.status(200).json({rooms})
}
// Book a Room
   export const Bookings=(req,res)=>{
    const { customerName, date, startTime, endTime, roomId,status,bookingDate} = req.body;
    const Room = rooms.find(r => r.id === roomId);
    if (!rooms) {

        return res.status(404).json({ error: 'Room not found' });
    }
    const newBooking = {
        bookingId: bookings.length + 1,
        customerName,
        date,
        startTime,
        endTime,
        roomId,
        bookingDate,
        status
    };
    bookings.push(newBooking);
    res.status(200).json({message:"Booking successfully!!",newBooking});
};

export const getBookings = (req,res)=>{
    res.status(200).json({bookings})
}

// List all Rooms with Booked Data

export const roomsBooked = (req, res) => {
    console.log('Rooms:', rooms);
    console.log('Bookings:', bookings);

    const convertedBookings = bookings.map(b => ({
        ...b,
        roomId: parseInt(b.roomId, 10)
    }));

    const roomBookings = rooms.map(room => {
        const roomBookings = convertedBookings
            .filter(b => b.roomId === room.roomId)
            .map(b => ({
                bookedStatus: b.status,
                customerName: b.customerName,
                date: b.date,
                startTime: b.startTime,
                endTime: b.endTime
            }));

        return {
            roomId: room.roomId,
            seats: room.seats,
            amenities: room.amenities,
            pricePerHour: room.pricePerHour,
            bookings: roomBookings
        };
    });

    console.log('Room Bookings:', roomBookings);

    res.status(200).json({
        message: "List all the rooms with booked data",
        roomBookings
    });
};



// List all Customers with Booked Data
    export const customersBooked=(req,res)=>{
    const customerBookings = bookings.map(b => {
        const room = rooms.find(r => r.id === b.roomId);
        return {
            customerName: b.customerName,
            roomName: room ? room.name : 'Unknown',
            date: b.date,
            startTime: b.startTime,
            endTime: b.endTime
        };
    });
    res.status(200).json({message:"list all the customers with booked data ",customerBookings});
};

// List How Many Times a Customer has Booked a Room
export const booked =(req,res)=>{
    const { customerName } = req.params;
    const customerBookings = bookings.filter(b => b.customerName === customerName);
    const bookingDetails = customerBookings.map(b => {
        const room = rooms.find(r => r.id === b.roomId);
        return {
            customerName: b.customerName,
            roomName: room ? room.name : 'Unknown',
            date: b.date,
            startTime: b.startTime,
            endTime: b.endTime,
            bookingId: b.id
        };
    });
    res.status(200).json({message:"customer has booked a room",bookingDetails});
}
