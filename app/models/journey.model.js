module.exports = (mongoose) => {
  let schema = mongoose.Schema(
    {
      journey: {
        type: String,
      },
      ref: {
        type: String,
      },
      user_id: {
        type: String,
      },
      qrcode: {
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
          },
          journey_legs: [{
            details: {
              type: String,
            },
            departurePoint: {
              type: String,
            },
            scheduledTime: {
              type: String,
            },
            duration: {
              type: String,
            },
            mode: {
              type: String,
            }
          }],
        },
      },
      Arrival: {
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
          },
          journey_legs: [{
            details: {
              type: String,
            },
            departurePoint: {
              type: String,
            },
            scheduledTime: {
              type: String,
            },
            duration: {
              type: String,
            },
            mode: {
              type: String,
            }
          }],
        },
      },
     
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
