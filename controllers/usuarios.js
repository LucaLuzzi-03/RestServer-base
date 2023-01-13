const { response, request } = require('express');
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');


const usuariosGet = async(req = request, res) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([
      Usuario.countDocuments( query ), // Esto filtra todos los usuarios que tengan el estado en true
      Usuario.find( query )
        .skip( Number(desde) )
        .limit( Number(limite) )
    ])

    res.json({
      total,
      usuarios
    });
  }

  const usuariosPut = async(req, res) => {

    const id = req.params.id;
    const { _id, password, google, correo, ...resto } = req.body;

    // Validar contra base de datos
    if ( password ) {
      // Encriptar la contraseña
      const salt = bcryptjs.genSaltSync(10); // Numero de vueltas de revision, mientras mas vueltas, mas seguro.
      resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json({
        usuario
    });
  }

  const usuariosPost = async(req, res) => {

    // const { google, ...todolodemas } = req.body; Separo "google" para que no puedan cambiar ese valor manualmente.
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10); // Numero de vueltas de revision, mientras mas vueltas, mas seguro.
    usuario.password = bcryptjs.hashSync( password, salt );

    //Guardar en DB
    await usuario.save();

    res.json({
        usuario
    });
  }

  const usuariosDelete = async(req, res) => {

    const { id } = req.params;

    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    res.json({
      usuario
    });
  }



  module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
  }