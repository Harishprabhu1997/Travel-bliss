const db = require("../models");
const profileDb = db.journey;
const ObjectId = require("mongoose").Types.ObjectId;

// Retrieve all data from the database.
exports.get = (req, res) => {
  profileDb
    .find()
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving",
      });
    });
};

// Retrieve data from id from the database .
exports.getById = (req, res) => {
  // if (!ObjectId.isValid(req.params.id)) {
  //   return res.status(400).json({
  //     error: "Given object id is not valid.",
  //   });
  // }
  profileDb
    .findById({user_id:req.params.id})
    .then((data) => {
      if (data) {
        return res.send(data);
      } else {
        return res.status(404).json({
          error: "no record with given _id : " + req.params.id,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving Id.",
      });
    });
};

// Post data to the database.

exports.adddata = (req, res) => {
  profileDb
    .create(req.body)
    .then((data) => res.status(201).json(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while Post",
      });
    });
};

// Update the data in database.
exports.updatedata = (req, res) => {
  profileDb
    .findByIdAndUpdate(req.params.id, req.body)
    .then((data) => {
      if (data) res.send(data);
      else
        res.status(404).json({
          error: "no record with given _id : " + req.params.id,
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while Update.",
      });
    });
};

//delete the data in database.
exports.removedata = (req, res) => {
  profileDb

    .findByIdAndDelete(req.params.id)
    .then((data) => {
      if (data) res.send(data);
      else
        res.status(404).json({
          error: "no record with given _id : " + req.params.id,
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while delete.",
      });
    });
};
