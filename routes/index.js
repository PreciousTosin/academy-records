// const express = require('express');
import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'No-Man Academy' });
});

// module.exports = router;
export default router;
