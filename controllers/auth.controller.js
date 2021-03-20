const {response, request} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');
const {generateJWT} = require('../helpers/jwt');

const createUser = async (req, res = response) => {
    
    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});
        if (user) return res.status(400).json({
            ok: false,
            msg: 'El email ya se encuentra registrado'
        })

        user = new User(req.body);
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        const resp = await user.save();

        const token = await generateJWT(user.id, user.name);

        return res.status(201).json({
            ok: true,
            msg: 'usuario creado',
            token,
            user: {
                uid: resp.id,
                name: resp.name
            }
        })
    } catch {
        res.status(500).json({
            ok: false,
            msg: 'Error interno'
        })
    }
    
}

const login = async (req = request, res = response) => {

    const {email, password} = req.body;

    try {

        const user = await User.findOne({email});
        if (!user) return res.status(400).json({
            ok: false,
            msg: 'Usuario o Contraseña incorrecta'
        })

        const validatePassword = bcrypt.compareSync(password, user.password);

        if (!validatePassword) return res.status(400).json({
            ok: false,
            msg: 'Usuario o Contraseña incorrecta'
        })

        const token = await generateJWT(user.id, user.name);

        return res.status(200).json({
            ok: true,
            msg: 'user logued',
            token,
            user: {
                name: user.name,
                uid: user.id
            }
        })
    } catch {
        res.status(500).json({
            ok: false,
            msg: 'Error interno'
        })
    }
}

const revalidateToken = async (req, res = response) => {
    const {uid, name} = req;

    try {
        const token = await generateJWT(uid, name);
    
        return res.status(200).json({
            ok: true,
            msg: 'Se ha generado un nuevo token',
            token,
            user: {
                uid,
                name 
            }
        })
    } catch {
        res.status(500).json({
            ok: false,
            msg: 'Error interno'
        })
    }
}

module.exports = {
    createUser,
    login,
    revalidateToken
}