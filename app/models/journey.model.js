module.exports = (mongoose) => {
  let schema = mongoose.Schema(
    {
      journey: {
        type: String,
      },
      user_id: {
        type: String,
      },
      Departure: {
        type: {
          departureTime: {
            type: String,
          },
          arrivalpoint: {
            type: String,
          },
          startTime: {
            type: String,
          },
          endTime: {
            type: String,
          },
          cost: {
            type: String,
          }
        },
      },
      journey_legs: [{
        departureTime: {
          type: String,
        },
        arrivalpoint: {
          type: String,
        },
        startTime: {
          type: String,
        },
        endTime: {
          type: String,
        },
        cost: {
          type: String,
        }
      }],
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const model = mongoose.model("journey", schema);
  return model;
};
