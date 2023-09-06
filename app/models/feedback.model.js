module.exports = (mongoose) => {
  let schema = mongoose.Schema(
    {
      headings: {
        type: String,
      },
      user_id: {
        type: String,
      },
      details: {
        type: String,
      },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const model = mongoose.model("feedback", schema);
  return model;
};
