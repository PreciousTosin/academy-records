// const express = require('express');
import express from 'express';
import path from 'path';

const router = express.Router();

/* GET home page. */
/*

router.get('/', (req, res) => {
  res.render('index', { title: 'No-Man Academy' });
});
*/

router.get('/', (req, res) => {
  // res.render('index', { title: 'Express' });
  res.sendFile(path.join(__dirname, '../../views/index.html'));
});

// module.exports = router;
export default router;
