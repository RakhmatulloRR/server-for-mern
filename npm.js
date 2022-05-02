const bcrypt = require('bcrypt');
const compression = require('compression');
const config = require('config');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const lodash = require('lodash');
const mongoose = require('mongoose');

module.exports = {bcrypt, compression, config, cors, express, helmet, Joi, jwt, lodash, mongoose}