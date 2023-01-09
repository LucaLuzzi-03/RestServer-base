const { response, request } = require('express');



const usuariosGet = (req = request, res) => {

    const { nombre, edad, nivel } = req.query;

    res.json({
        msg: "get API - controlador",
        nombre,
        edad,
        nivel
    });
  }

  const usuariosPut = (req, res) => {

    const id = req.params.id;

    res.json({
        msg: "put API - controlador",
        id
    });
  }

  const usuariosPost = (req, res) => {

    const { nombre, edad } = req.body;

    res.json({
        msg: "post API - controlador",
        nombre,
        edad
    });
  }

  const usuariosDelete = (req, res) => {
    res.json({
        msg: "delete API - controlador"
    });
  }



  module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
  }