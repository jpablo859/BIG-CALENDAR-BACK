const {response} = require('express');
const Event = require('../models/Event.model');

const getEvents = async (req, res = response) => {
    
    try {
        const filter = {user:req.uid};
        const events = await Event.find(filter).populate('user', 'name');

        return res.status(201).json({
            ok: true,
            events
        })
    } catch {
        res.status(500).json({
            ok: false,
            msg: 'Error interno'
        })
    }
    
}

const createEvent = async (req, res = response) => {
    try {

        const event = new Event(req.body);
        event.user = req.uid;
        const resp = await event.save();

        return res.status(201).json({
            ok: true,
            msg: 'evento creado',
            event: resp
        })
    } catch(err) {
        console.error(err)
        res.status(500).json({
            ok: false,
            msg: 'Error interno'
        })
    }
    
}

const updateEvent = async (req, res = response) => {
    
    const eventId = req.params.id;

    try {
        const filter = {_id: eventId, user: req.uid};
        const update = {
            ...req.body,
            user: req.uid
        }
        const event = await Event.findOneAndUpdate(filter,update);

        if (!event) return res.status(404).json({
            ok: false,
            msg: 'No existe el evento'
        })

        return res.status(200).json({
            ok: true,
            msg: 'evento actualizado',
            eventId
        })
    } catch (err){
        console.log(err)
        res.status(500).json({
            ok: false,
            msg: 'Error interno'
        })
    }
    
}

const deleteEvent = async (req, res = response) => {
    
    const eventId = req.params.id;

    try {
        const filter = {_id: eventId, user: req.uid};
        const event = await Event.findOneAndDelete(filter);

        if (!event) return res.status(404).json({
            ok: false,
            msg: 'No existe el evento'
        })

        return res.status(200).json({
            ok: true,
            msg: 'evento eliminado',
            eventId
        })
    } catch (err){
        console.log(err)
        res.status(500).json({
            ok: false,
            msg: 'Error interno'
        })
    }
    
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}