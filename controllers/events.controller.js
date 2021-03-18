const {response} = require('express');
const bcrypt = require('bcryptjs');
const Event = require('../models/Event.model');
const {generateJWT} = require('../helpers/jwt');
const { findOneAndUpdate } = require('../models/Event.model');


const getEvents = async (req, res = response) => {
    
    try {

        const events = await Event.find().populate('user', 'name');

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
        const excec = await event.save();

        return res.status(201).json({
            ok: true,
            msg: 'evento creado',
            excec
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
        console.log(filter, update)
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