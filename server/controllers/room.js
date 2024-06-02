import { Room } from "../models/room.js";

// Controller functions
export const createRoom = async (req, res) => {
    const { topic, roomType } = req.body;

    if (!topic || !roomType) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    try {
        const { _id: ownerId } = req.user;
        const speakers = [ownerId];

        const room = await Room.create({
            topic,
            roomType,
            ownerId,
            speakers,
        });

        return res.json(room);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error creating room' });
    }
};

export const getAllRooms = async (req, res) => {
    try {
        const types = ['open']; // Define the room types to retrieve
        const rooms = await Room.find({ roomType: { $in: types } })
            .populate('speakers')
            .populate('ownerId')
            .exec();

        return res.json(rooms);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error fetching rooms' });
    }
};

export const getRoom = async (req, res) => {
    const { roomId } = req.params;

    try {
        const room = await Room.findOne({ _id: roomId })
        console.log(room);
        return res.json(room);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error fetching room' });
    }
};
